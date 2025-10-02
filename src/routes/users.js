import { Router } from 'express';
import * as controller from '../controllers/autoresControllers.js'; 
import { 
  createAutorValidators, 
  createCategoriaValidators, 
  createLibroValidators, 
  runValidations 
} from '../middlewares/validators.js';

const router = Router();

router.get("/usuarios", controller.getAllUsuarios);
router.get("/usuarios/:id", controller.getUsuarioById);
router.post("/usuarios", controller.createUsuario);
router.put("/usuarios/:id", controller.updateUsuario);
router.delete("/usuarios/:id", controller.deleteUsuario);

router.get("/usuarios/nombre/:nombre", controller.getUsuariosByNombre);
router.get("/usuarios/apellido/:apellido", controller.getUsuariosByApellido);
router.get("/usuarios/rol/:rol", controller.getUsuariosByRol);

router.get("/publicaciones", controller.getAllPublicaciones);
router.get("/publicaciones/:id", controller.getPublicacionById);
router.post("/publicaciones", controller.createPublicacion);
router.put("/publicaciones/:id", controller.updatePublicacion);
router.delete("/publicaciones/:id", controller.deletePublicacion);

router.get("/publicaciones/usuario/:usuariold", controller.getPublicacionesByUsuario);

router.get("/publicaciones/top/:n", controller.getTopPublicaciones);

router.get("/comentarios", controller.getAllComentarios);
router.get("/comentarios/:id", controller.getComentarioById);
router.post("/comentarios", controller.createComentario);
router.put("/comentarios/:id", controller.updateComentario);
router.delete("/comentarios/:id", controller.deleteComentario);

router.get("/comentarios/publicacion/:publicacionld", controller.getComentariosByPublicacion);
router.get("/comentarios/usuario/:usuariold", controller.getComentariosByUsuario);

router.get("/roles", controller.getAllRoles);
router.get("/roles/:id", controller.getRolById);
router.post("/roles", controller.createRol);
router.put("/roles/:id", controller.updateRol);
router.delete("/roles/:id", controller.deleteRol);


export default router;



