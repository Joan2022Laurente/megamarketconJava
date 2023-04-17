import {connect} from"../database"


export const getPlatos = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM platos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de platos' });
  }
};

export const getPlato = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM platos WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el plato" });
  }
};

export const getPlatosCount = async (req, res) => {
  const db = await connect();
  const [rows] = await db.query("SELECT COUNT(*) as count FROM platos");
  const count = rows[0].count;
  res.json({ count });
}

export const savePlato = async (req, res) => {
  try {
    const {nombre, imagen, costo} = req.body;
    const db = await connect();
    const result = await db.query(
      "INSERT INTO platos (nombre, imagen, costo) VALUES (?, ?, ?)",
      [nombre, imagen, costo]
    );
    const {insertId} = result[0];
    res.json({
      id: insertId,
      nombre,
      imagen,
      costo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error al guardar el plato"});
  }
};

export const eliminarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connect();
    const result = await db.query("DELETE FROM platos WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "El plato no existe" });
    } else {
      res.json({ message: "Plato eliminado correctamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el plato" });
  }
};

export const editarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, imagen, costo } = req.body;
    const db = await connect();
    const result = await db.query(
      "UPDATE platos SET nombre = ?, imagen = ?, costo = ? WHERE id = ?",
      [nombre, imagen, costo, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("El plato no fue encontrado");
    }
    res.json({
      message: "Plato actualizado exitosamente",
      id,
      nombre,
      imagen,
      costo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el plato" });
  }
};


const jwt = require('jsonwebtoken');


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM usuarios WHERE user = ? AND password = ?', [username, password]);

    if (rows.length === 0) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    const token = jwt.sign({ id: rows[0].id }, 'secreto', { expiresIn: '1h' });
    res.json({ token, user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};