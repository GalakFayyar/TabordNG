from swallow.settings import EXIT_IO_ERROR, EXIT_USER_INTERRUPT
import sys
import time
import psycopg2
from psycopg2.extras import RealDictCursor
from swallow.logger_mp import get_logger_mp


class PostgreSqlIo:
    """Reads & Write documents from a PostgreSQL DB"""

    def __init__(self, p_host, p_port, p_base, p_user, p_password):
        """Class creation

            p_host:        PostgreSQL Server address
            p_port:        PostgreSQL Server port
            p_base:        PostgreSQL base
            p_user:        PostgreSQL user
            p_password:    PostgreSQL password
        """
        self.host = p_host
        self.port = p_port
        self.base = p_base
        self.user = p_user
        self.password = p_password

    def scan_and_queue(self, p_queue, p_query, p_bulksize=1000, p_start=0):
        """Reads docs according to a query and pushes them to the queue

            p_queue:         Queue where items are pushed to
            p_query:        MongoDB query for scanning the collection
        """
        logger = get_logger_mp(__name__, self.log_queue, self.log_level, self.formatter)

        connection_string = "host='{dbhost}' dbname='{dbname}' user='{dbuser}'' password='{dbpass}'".format(
            dbhost=self.host,
            dbname=self.base,
            dbuser=self.user,
            dbpass=self.password
        )
        connection = psycopg2.connect(connection_string)

        try:
            offset = p_start
            stop = False
            # delete ";" if set at the end of the query
            query = p_query
            if query.endswith(';'):
                query = query[:-1]
            with connection.cursor(cursor_factory=RealDictCursor) as cursor:
                while not stop:
                    paginated_query = "{0} limit {1},{2}".format(p_query, offset, p_bulksize)
                    logger.debug("PostgreSqlIo : Start dealing with records from {0} to {1}".format(offset, p_bulksize + offset))
                    try:
                        cursor.execute(paginated_query)
                    except psycopg2.OperationalError as e:
                        logger.error("PostgreSqlIo : Error while dealing with records from {0} to {1}".format(offset, p_bulksize + offset))
                        logger.error(e)
                        raise e
                    if cursor.rowcount:
                        for row in cursor:
                            p_queue.put(row)
                        offset += p_bulksize
                    else:
                        stop = True
                    logger.debug("PostgreSqlIo : All records from {0} to {1} has been put in the queue".format(offset, p_bulksize + offset))
                cursor.close()
        except Exception as e:
            logger.error("PostgreSqlIo : Stop reading !")
            logger.error(e)
        finally:
            connection.close()

    def dequeue_and_store(self, p_queue, p_table, p_id_field="id"):
        """
            Gets docs from p_queue and stores them in a postgresql database
            Stops dealing with the queue when receiving a "None" item
            p_queue:             queue wich items are picked from. Elements has to be "list"
            p_table:             table to operate
            p_id_field:          name of the table id field (default "id")
        """
        logger = get_logger_mp(__name__, self.log_queue, self.log_level, self.formatter)

        try:
            connection_string = "host='{dbhost}' dbname='{dbname}' user='{dbuser}' password='{dbpass}'".format(
                dbhost=self.host,
                dbname=self.base,
                dbuser=self.user,
                dbpass=self.password
            )
            connection = psycopg2.connect(connection_string)
            cursor = connection.cursor(cursor_factory=RealDictCursor)
        except psycopg2.Error as e:
            logger.error('Failed to connect to {db}'.format(db=self.base))
            logger.error(e)
            sys.exit(EXIT_IO_ERROR)

        # Loop untill receiving the "poison pill" item (meaning : no more element to read)
        poison_pill = False

        while not(poison_pill):
            try:

                source_doc = p_queue.get()

                # Manage poison pill
                if source_doc is None:
                    poison_pill = True
                    p_queue.task_done()
                    connection.commit()
                    break

                # Manage SQL parameters
                sql_fields = "({0})".format(",".join(source_doc.keys()))
                # sql_values = "{0}".format(",".join(repr(e).strip().replace("'", "''") for e in source_doc.values()))
                # sql_update_fields_values_excluded = ",".join(["{field}=EXCLUDED.{field}".format(field=field) for field in source_doc.keys()])
                # sql_update_fields_values = ",".join(["{field}='{value}'".format(field=field, value=source_doc[field].strip().replace("'", "''")) for field in source_doc.keys() if field != p_id_field])
                sql_update_fields_values = ",".join(["{field}=%s".format(field=field) for field in source_doc.keys() if field != p_id_field])

                try:
                    cursor = connection.cursor(cursor_factory=RealDictCursor)
                    # Only for V. psql > 9.5
                    # sql_p95 = """INSERT INTO {table} {fields}
                    #          VALUES ({values})
                    #          ON CONFLICT ({id_field}) DO UPDATE SET {update_fields_values};""".format(
                    #             table=p_table,
                    #             fields=sql_fields,
                    #             values=sql_values,
                    #             id_field=p_id_field,
                    #             update_fields_values=sql_update_fields_values_excluded)


                    # insert_sql = "INSERT INTO {table} {fields} SELECT {values}".format(
                    #         table=p_table,
                    #         fields=sql_fields,
                    #         values=sql_values
                    #     )
                    # update_sql = "UPDATE {table} SET {update_fields_values} WHERE {id_field} = {id_value}".format(
                    #         table=p_table,
                    #         update_fields_values=sql_update_fields_values,
                    #         id_field=p_id_field,
                    #         id_value=source_doc[p_id_field]
                    #     )



                    # sql = """
                    #     BEGIN;
                    #     LOCK TABLE {table} IN SHARE ROW EXCLUSIVE MODE;
                    #     WITH upsert AS ({update_sql} RETURNING *) {insert_sql} WHERE NOT EXISTS (SELECT * FROM upsert);
                    #     COMMIT;
                    # """.format(
                    #         table=p_table,
                    #         update_sql=update_sql,
                    #         insert_sql=insert_sql
                    #     )





                    # Manage SQL Parameters
                    insert_sql = "INSERT INTO {table} {fields} SELECT {values}".format(
                            table=p_table,
                            fields=sql_fields,
                            values=('%s,' * len(source_doc.values()))[:-1]
                        )
                    update_sql = "UPDATE {table} SET {update_fields_values} WHERE {id_field} = {id_value}".format(
                            table=p_table,
                            update_fields_values=sql_update_fields_values,
                            id_field=p_id_field,
                            id_value=source_doc[p_id_field]
                        )

                    sql = """
                        WITH upsert AS ({update_sql} RETURNING *) {insert_sql} WHERE NOT EXISTS (SELECT * FROM upsert);
                    """.format(
                            update_sql=update_sql,
                            insert_sql=insert_sql
                        )

                    print(sql)
                    print([source_doc[key] for key in source_doc.keys()][::-1])
                    print([source_doc[key] for key in source_doc.keys() if key != p_id_field][::-1])
                    parameters = [source_doc[key] for key in source_doc.keys() if key != p_id_field][::-1] + [source_doc[key] for key in source_doc.keys()][::-1]
                    print(parameters)
                    cursor.execute(sql, parameters)
                except psycopg2.Error as e:
                    with self.counters['nb_items_error'].get_lock():
                        self.counters['nb_items_error'].value += 1
                    logger.error("Document not inserted in PostgreSQL Database %s", source_doc)
                    logger.error(e)
                else:
                    with self.counters['nb_items_stored'].get_lock():
                        self.counters['nb_items_stored'].value += 1
                        if self.counters['nb_items_stored'].value % self.counters['log_every'] == 0:
                            logger.info("Storage in progress : {0} items written to target".format(self.counters['nb_items_stored'].value))

                p_queue.task_done()

            except KeyboardInterrupt:
                logger.info("Postgresqlio.dequeue_and_store : User interruption of the process")
                sys.exit(EXIT_USER_INTERRUPT)
