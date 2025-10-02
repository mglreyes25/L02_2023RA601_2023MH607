import { pool } from '../db.js';


//
// ================== USUARIOS ==================
//

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const result = await pool.query("SELECT * FROM usuarios");
  return result.rows;
};

export const getUsuarioById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE usuariold = $1",
    [id]
  );
  return result.rows[0] || null;
};


// Crear usuario
export const createUsuario = async (
  rolld,
  nombreUsuario,
  clave,
  nombre,
  apellido
) => {
  const result = await pool.query(
    `INSERT INTO usuarios (rolld, nombreUsuario, clave, nombre, apellido) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [rolld, nombreUsuario, clave, nombre, apellido]
  );
  return result.rows[0];
};

// Actualizar usuario
export const updateUsuario = async (
  id,
  rolld,
  nombreUsuario,
  clave,
  nombre,
  apellido
) => {
  const result = await pool.query(
    `UPDATE usuarios 
     SET rolld=$2, nombreUsuario=$3, clave=$4, nombre=$5, apellido=$6
     WHERE usuariold=$1 RETURNING *`,
    [id, rolld, nombreUsuario, clave, nombre, apellido]
  );
  return result.rows[0] || null;
};

// Eliminar usuario
export const deleteUsuario = async (id) => {
  await pool.query("DELETE FROM usuarios WHERE usuariold=$1", [id]);
};

// Buscar por nombre
export const getUsuariosByNombre = async (nombre) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE LOWER(nombre) LIKE LOWER($1)",
    [`%${nombre}%`]
  );
  return result.rows;
};

// Buscar por apellido
export const getUsuariosByApellido = async (apellido) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE LOWER(apellido) LIKE LOWER($1)",
    [`%${apellido}%`]
  );
  return result.rows;
};

// Buscar por rol
export const getUsuariosByRol = async (rol) => {
  const result = await pool.query(
    `SELECT u.* FROM usuarios u
     JOIN roles r ON u.rolld = r.rolld
     WHERE LOWER(r.rol) = LOWER($1)`,
    [rol]
  );
  return result.rows;
};

// ================== PUBLICACIONES ==================

// Obtener todas las publicaciones
export const getAllPublicaciones = async () => {
  const result = await pool.query("SELECT * FROM publications ORDER BY publicacionld");
  return result.rows;
};

// Obtener publicación por ID
export const getPublicacionById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM publications WHERE publicacionld = $1",
    [id]
  );
  return result.rows[0] || null;
};

// Crear publicación
export const createPublicacion = async (titulo, description, usuariold) => {
  const result = await pool.query(
    `INSERT INTO publications (titulo, description, usuariold)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [titulo, description, usuariold]
  );
  return result.rows[0];
};

// Actualizar publicación
export const updatePublicacion = async (id, titulo, description, usuariold) => {
  const result = await pool.query(
    `UPDATE publications
     SET titulo = $2, description = $3, usuariold = $4
     WHERE publicacionld = $1
     RETURNING *`,
    [id, titulo, description, usuariold]
  );
  return result.rows[0] || null;
};

// Eliminar publicación
export const deletePublicacion = async (id) => {
  const result = await pool.query(
    "DELETE FROM publications WHERE publicacionld = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
};

// Publicaciones por usuario
export const getPublicacionesByUsuario = async (usuariold) => {
  const result = await pool.query(
    "SELECT * FROM publications WHERE usuariold = $1 ORDER BY publicacionld",
    [usuariold]
  );
  return result.rows;
};

// Top N publicaciones con más comentarios
export const getTopPublicaciones = async (n) => {
  const result = await pool.query(
    `SELECT p.publicacionld, p.titulo, COUNT(c.cometariold) AS total_comentarios
     FROM publications p
     LEFT JOIN comentarios c ON p.publicacionld = c.publicacionld
     GROUP BY p.publicacionld, p.titulo
     ORDER BY total_comentarios DESC
     LIMIT $1`,
    [n]
  );
  return result.rows;
};


//
// ================== COMENTARIOS ==================
//

// Obtener todos los comentarios
export const getAllComentarios = async () => {
  const result = await pool.query("SELECT * FROM comentarios");
  return result.rows;
};

// Obtener comentario por ID
export const getComentarioById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM comentarios WHERE cometariold=$1",
    [id]
  );
  return result.rows[0];
};

// Crear comentario
export const createComentario = async (publicacionld, comentario, usuariold) => {
  const result = await pool.query(
    `INSERT INTO comentarios (publicacionld, comentario, usuariold)
     VALUES ($1, $2, $3) RETURNING *`,
    [publicacionld, comentario, usuariold]
  );
  return result.rows[0];
};

// Actualizar comentario
export const updateComentario = async (id, publicacionld, comentario, usuariold) => {
  const result = await pool.query(
    `UPDATE comentarios 
     SET publicacionld=$2, comentario=$3, usuariold=$4 
     WHERE cometariold=$1 RETURNING *`,
    [id, publicacionld, comentario, usuariold]
  );
  return result.rows[0];
};

// Eliminar comentario
export const deleteComentario = async (id) => {
  await pool.query("DELETE FROM comentarios WHERE cometariold=$1", [id]);
};

// Comentarios por publicación
export const getComentariosByPublicacion = async (publicacionld) => {
  const result = await pool.query(
    "SELECT * FROM comentarios WHERE publicacionld=$1",
    [publicacionld]
  );
  return result.rows;
};

// Comentarios por usuario
export const getComentariosByUsuario = async (usuariold) => {
  const result = await pool.query(
    "SELECT * FROM comentarios WHERE usuariold=$1",
    [usuariold]
  );
  return result.rows;
};

//roles

export const getAllRoles = async () => {
  const result = await pool.query("SELECT * FROM roles");
  return result.rows;
};

export const getRolById = async (id) => {
  const result = await pool.query("SELECT * FROM roles WHERE rolld=$1", [id]);
  return result.rows[0];
};

export const createRol = async (rol) => {
  const result = await pool.query(
    "INSERT INTO roles (rol) VALUES ($1) RETURNING *",
    [rol]
  );
  return result.rows[0];
};

export const updateRol = async (id, rol) => {
  const result = await pool.query(
    "UPDATE roles SET rol=$2 WHERE rolld=$1 RETURNING *",
    [id, rol]
  );
  return result.rows[0];
};

export const deleteRol = async (id) => {
  await pool.query("DELETE FROM roles WHERE rolld=$1", [id]);
};

//
// ================== CALIFICACIONES ==================
//

// Obtener todas las calificaciones
export const getAllCalificaciones = async () => {
  const result = await pool.query("SELECT * FROM calificaciones");
  return result.rows;
};

// Obtener calificación por ID
export const getCalificacionById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM calificaciones WHERE calificacionld=$1",
    [id]
  );
  return result.rows[0];
};

// Crear calificación
export const createCalificacion = async (publicacionld, usuariold, calificacion) => {
  const result = await pool.query(
    `INSERT INTO calificaciones (publicacionld, usuariold, calificacion)
     VALUES ($1, $2, $3) RETURNING *`,
    [publicacionld, usuariold, calificacion]
  );
  return result.rows[0];
};

// Actualizar calificación
export const updateCalificacion = async (id, publicacionld, usuariold, calificacion) => {
  const result = await pool.query(
    `UPDATE calificaciones
     SET publicacionld=$2, usuariold=$3, calificacion=$4
     WHERE calificacionld=$1 RETURNING *`,
    [id, publicacionld, usuariold, calificacion]
  );
  return result.rows[0];
};

// Eliminar calificación
export const deleteCalificacion = async (id) => {
  await pool.query("DELETE FROM calificaciones WHERE calificacionld=$1", [id]);
};

// Calificaciones por publicación
export const getCalificacionesByPublicacion = async (publicacionld) => {
  const result = await pool.query(
    "SELECT * FROM calificaciones WHERE publicacionld=$1",
    [publicacionld]
  );
  return result.rows;
};

// Calificaciones por usuario
export const getCalificacionesByUsuario = async (usuariold) => {
  const result = await pool.query(
    "SELECT * FROM calificaciones WHERE usuariold=$1",
    [usuariold]
  );
  return result.rows;
};

// Promedio de calificación por publicación
export const getPromedioCalificacionPorPublicacion = async (publicacionld) => {
  const result = await pool.query(
    `SELECT AVG(calificacion)::numeric(10,2) AS promedio
     FROM calificaciones
     WHERE publicacionld=$1`,
    [publicacionld]
  );
  return result.rows[0];
};
