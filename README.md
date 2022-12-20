<h1><center><b>Instalacion, Configuración de ficheros y de usuarios de MongoDB </b></center></h1>
----------------------------------------------------------------------------------

<h2>Objetivo</h2>
<p>
Este playbook, instala cualquier version de MongoDB para sistema Linux, el propio codigo determina la distribución de linux e instalará las dependencias de la version seleccionada de Mongo (probado en CentOS 7, CentOS 8, Debian 9, Ubuntu 22.04 y Ubuntu 21.10)

Posteriormente, se configurará a traves de un template la configuración base de Mongo (mongo.conf), donde creará los directorios (logs y data), por lo que cambiando las variables de default, podemos personalizar la ubicación de los ficheros (mongo.conf, data y logs).

Toda la configuración es personalizada y modificando las variables podemos cambiar: El puerto de Mongo, la version de mongo y la de pymongo y  los nombres de usuarios, password y rol de cada usuario Mongo.

Por ultimo creará 3 usuarios de mongodb, con su usuario, contraseña y rol definido

Tenemos un rol definido, se compone de 7 task, un archivo default (donde se guardan las varaibles de menor prioridad), dos templates y un handler. El task principal (main.yml) llama a los otros task con el comando include. Podemos observar la estructura en el apartado "Estructura del proyecto".
</p>

<h2>Estructura del proyecto</h2>

<pre>
.
├── mongo.yml
├── README.md
└── roles
    └── mongo
        ├── defaults
        │   └── main.yml
        ├── handlers
        │   └── main.yml
        ├── tasks
        │   ├── Añadir_usuarios_mongo.yml
        │   ├── configuracion_systemd_mongo_units.yml
        │   ├── configurar_directorios_mongo.yml
        │   ├── configurar_python_pymongo.yml
        │   ├── instalacion_centos_redhat.yml
        │   ├── instalacion_ubuntu_debian.yml
        │   ├── main.yml
        │   └── SELinux_firewald_centos.yml
        └── templates
            ├── Linux_mongod.service.j2
            └── mongod_conf.j2
</pre>

<h2>Variables del role</h2>
----------------------------------------------------------------------------------
<p>
  Este rol contiene variables definidas situadas en dedault..

  <h4>Importante: Pymongo, es una dependencia del modulo "mongodb_user" de Ansible (perite crear usuarios dentro de mongo). Al cambiar la versión de mongo(4.4) mirar cual es la version compatible de pymongo (4.1.1), ya que ambas van ligadas de la mano y si no se cambia la version de pymongo puede generar problemas de compatibilidades</h4>
</p>

<pre>
  # Version de mongo
  version_de_mongo: 4.4

  # Version des pymongo a instalar (mirar compatibilidades con la version de mongo)
  version_pymongo: 4.1.1

  # MongoDB Configuration
  archivo_configuracion_conf: /etc/mongod.conf
  archivo_configuracion_db: /data/mongo-data/
  archivo_configuracion_logs: /var/log/mongodb/
  puerto_mongobd: 27017
  mongodb_journal: true
  mongodb_conf_bindIp: 127.0.0.1
  mongod_conf_engine: wiredTiger

  # Account configuration
  cuenta_usuario_root: root
  password_usuario_root: "bolson"
  rol_del_usuario_root: "userAdminAnyDatabase"

  cuenta_usuario_administrativo: dbadmin
  password_usuario_administrativo: "admin"
  rol_del_usuario_administrativo: "userAdminAnyDatabase"

  cuenta_usuario_backup: backupadmin
  password_usuario_backup: "admin"
  rol_del_usuario_backup: "backup,clusterMonitor"

  # ruta del fichero de configuracion del demonio
  demonio_mongodb: /etc/systemd/system/mongod.service
</pre>

<h2>Playbook principal</h2>
----------------------------------------------------------------------------------
<h4>En el playbook prinicpal llamamos al rol_name para que ejecute todo el proceso</h4>
<pre>

---
-
  name: 'Iniciando el programa mongo .....'
  hosts: all
  become: True
  tasks:
   - name:
     import_role:
       name: mongo

</pre>

<h2>Task principal</h2>
----------------------------------------------------------------------------------

<pre>

---
#Instalación, configuración y creación de usuario de mongodb, tanto para CentOS/RedHat como 
#para Ubuntu/Debian. Según su sistema Operativo filtramos la instalación. 
- include: instalacion_centos_redhat.yml
  when: ansible_os_family == "RedHat"

- include: instalacion_ubuntu_debian.yml
  when: ansible_os_family == "Debian"

#Configuramos los ficheros de mongodb.
- include: configurar_directorios_mongo.yml

#En CentOS/RedHat, desabilitamos SELinux Y  habilitamos el puerto de mongo.
- include: SELinux_firewald_centos.yml
  when: ansible_os_family == "RedHat"

#Configuramos el demonio de mongo para enrutar el fichero de configuracion inicial.
- include: configuracion_systemd_mongo_units.yml

#Configuramos los usuarios, para usar el modulo user de mongo.
#necesitamos  instalar la dependencia (pymongo).
- include: configurar_python_pymongo.yml
- include: Añadir_usuarios_mongo.yml

</pre>