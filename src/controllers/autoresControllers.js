import * as service from "../services/usersServices.js";

/* ==========================
   📍 USUARIOS
========================== */

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await service.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await service.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Crear usuario
export const createUsuario = async (req, res) => {
  try {
    const { rolld, nombreUsuario, clave, nombre, apellido } = req.body;
    const usuario = await service.createUsuario(rolld, nombreUsuario, clave, nombre, apellido);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  try {
    const { rolld, nombreUsuario, clave, nombre, apellido } = req.body;
    const usuario = await service.updateUsuario(
      req.params.id,
      rolld,
      nombreUsuario,
      clave,
      nombre,
      apellido
    );
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    await service.deleteUsuario(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Filtrar usuarios
export const getUsuariosByNombre = async (req, res) => {
  try {
    const usuarios = await service.getUsuariosByNombre(req.params.nombre);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuariosByApellido = async (req, res) => {
  try {
    const usuarios = await service.getUsuariosByApellido(req.params.apellido);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuariosByRol = async (req, res) => {
  try {
    const usuarios = await service.getUsuariosByRol(req.params.rol);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ==========================
   📍 PUBLICACIONES
========================== */

// Obtener todas las publicaciones
export const getAllPublicaciones = async (req, res) => {
  try {
    const publicaciones = await service.getAllPublicaciones();
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener publicación por ID
export const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await service.getPublicacionById(req.params.id);
    if (!publicacion) return res.status(404).json({ message: "Publicación no encontrada" });
    res.json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear publicación
export const createPublicacion = async (req, res) => {
  try {
    const { titulo, description, usuariold } = req.body;
    const publicacion = await service.createPublicacion(titulo, description, usuariold);
    res.status(201).json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar publicación
export const updatePublicacion = async (req, res) => {
  try {
    const { titulo, description, usuariold } = req.body;
    const publicacion = await service.updatePublicacion(
      req.params.id,
      titulo,
      description,
      usuariold
    );
    if (!publicacion) return res.status(404).json({ message: "Publicación no encontrada" });
    res.json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar publicación
export const deletePublicacion = async (req, res) => {
  try {
    await service.deletePublicacion(req.params.id);
    res.json({ message: "Publicación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Publicaciones por usuario
export const getPublicacionesByUsuario = async (req, res) => {
  try {
    const publicaciones = await service.getPublicacionesByUsuario(req.params.usuariold);
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Top N publicaciones más comentadas
export const getTopPublicaciones = async (req, res) => {
  try {
    const top = await service.getTopPublicaciones(req.params.n);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ==========================
   📍 COMENTARIOS
========================== */

// Obtener todos los comentarios
export const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await service.getAllComentarios();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener comentario por ID
export const getComentarioById = async (req, res) => {
  try {
    const comentario = await service.getComentarioById(req.params.id);
    if (!comentario) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear comentario
export const createComentario = async (req, res) => {
  try {
    const { publicacionld, comentario, usuariold } = req.body;
    const nuevo = await service.createComentario(publicacionld, comentario, usuariold);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar comentario
export const updateComentario = async (req, res) => {
  try {
    const { publicacionld, comentario, usuariold } = req.body;
    const actualizado = await service.updateComentario(
      req.params.id,
      publicacionld,
      comentario,
      usuariold
    );
    if (!actualizado) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar comentario
export const deleteComentario = async (req, res) => {
  try {
    await service.deleteComentario(req.params.id);
    res.json({ message: "Comentario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comentarios por publicación
export const getComentariosByPublicacion = async (req, res) => {
  try {
    const comentarios = await service.getComentariosByPublicacion(req.params.publicacionld);
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comentarios por usuario
export const getComentariosByUsuario = async (req, res) => {
  try {
    const comentarios = await service.getComentariosByUsuario(req.params.usuariold);
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await service.getAllRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRolById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rol = await service.getRolById(id);
    res.json(rol);
  } catch (error) {
    next(error);
  }
};

export const createRol = async (req, res, next) => {
  try {
    const { rol } = req.body;
    const nuevoRol = await service.createRol(rol);
    res.status(201).json(nuevoRol);
  } catch (error) {
    next(error);
  }
};

export const updateRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    const rolActualizado = await service.updateRol(id, rol);
    res.json(rolActualizado);
  } catch (error) {
    next(error);
  }
};

export const deleteRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.deleteRol(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

/* ==========================
   📍 CALIFICACIONES
========================== */

// Obtener todas las calificaciones
export const getAllCalificaciones = async (req, res) => {
  try {
    const calificaciones = await service.getAllCalificaciones();
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener calificación por ID
export const getCalificacionById = async (req, res) => {
  try {
    const calificacion = await service.getCalificacionById(req.params.id);
    if (!calificacion) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json(calificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear calificación
export const createCalificacion = async (req, res) => {
  try {
    const { publicacionld, usuariold, calificacion } = req.body;
    const nueva = await service.createCalificacion(publicacionld, usuariold, calificacion);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar calificación
export const updateCalificacion = async (req, res) => {
  try {
    const { publicacionld, usuariold, calificacion } = req.body;
    const actualizada = await service.updateCalificacion(
      req.params.id,
      publicacionld,
      usuariold,
      calificacion
    );
    if (!actualizada) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar calificación
export const deleteCalificacion = async (req, res) => {
  try {
    await service.deleteCalificacion(req.params.id);
    res.json({ message: "Calificación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calificaciones por publicación
export const getCalificacionesByPublicacion = async (req, res) => {
  try {
    const calificaciones = await service.getCalificacionesByPublicacion(req.params.publicacionld);
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calificaciones por usuario
export const getCalificacionesByUsuario = async (req, res) => {
  try {
    const calificaciones = await service.getCalificacionesByUsuario(req.params.usuariold);
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Promedio de calificaciones por publicación
export const getPromedioCalificacionPorPublicacion = async (req, res) => {
  try {
    const promedio = await service.getPromedioCalificacionPorPublicacion(req.params.publicacionld);
    res.json(promedio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
