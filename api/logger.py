import logging
from logging.handlers import RotatingFileHandler

# Logger de l'application
logger = logging.getLogger('api-tabord-ng')
logger.compteur = 0

# Configuration du logger
def configure(p_level,p_dir=None,p_filename=None,p_max_filesize=100000,p_max_files=1,p_prefixe=None):
    logger = logging.getLogger('api-tabord-ng')
    # default value
    logger.setLevel(logging.DEBUG)

    # Format identique pour tous les handlers
    if p_prefixe:
        formatter = logging.Formatter('['+p_prefixe+'] %(asctime)s :: %(levelname)s :: %(message)s')
    else:
        formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(message)s')

    # Handler console
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(p_level)
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    if p_dir is not None:
        # Handler de type Fichier
        file_path = p_dir + '/' + p_filename
        file_handler = RotatingFileHandler(file_path, 'a', p_max_filesize, p_max_files)
        file_handler.setLevel(p_level)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)