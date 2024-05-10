const Cliente = require('../models/Cliente');

// funcion para  buscar los clientes que esten en la base  datos 
exports.buscarClientes = async(req, res) => {

    try {

        const cliente = await Cliente.find();
        res.json(cliente)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al buscar los clientes');           
    }
}

// funcion agregar clientes 
exports.agregarClientes = async(req, res) => {

    try {
     
        let cliente;
        cliente = new Cliente(req.body)
        await cliente.save();
        res.json(cliente);
        
    } catch (error) {
      console.log(error)
      res.status(500).send('hubo un error al agregar un cliente');  
    }
}

// esta funcion es para  mostrar un solo cliente
exports.buscarCliente = async(req,res) =>{

    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).send({msg:"cliente no encontrado con ese ID"});
            return
        }
        res.json(cliente);      
        
    } catch (error) {
      console.log(error)
      res.status(500).send('hubo un error al buscar un cliente'); 
        }
}

//  esta  funcion nos srive para  eliminar  un  cliente
exports.eliminarCliente = async(req, res) => {

    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).json({msg:"El cliente no existe"})
            return
        }
        await Cliente.findOneAndDelete({_id: req.params.id});
        res.json({msg:"El cliente ha sido Eliminado"});
        return
        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al eliminar un cliente');  
    }
}

// esta funcion es para actualizar un cliente

exports.actualizarCliente = async(req, res) => {
    try {
        const {nombres, apellidos, documento, correo, telefono, direccion} = req.body
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            res.status(404).json({msg: "el cliente no existe "});
            return
        }
            cliente.nombres = nombres;
            cliente.apellidos = apellidos;
            cliente.documento =documento;
            cliente.correo = correo;
            cliente.telefono = telefono;
            cliente.direccion = direccion;
            
            cliente = await Cliente.findOneAndUpdate({_id: req.params.id}, cliente,{new:true});
            res.json(cliente);
               
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error al actualizar un cliente'); 
       
    }
}

/*
exports.actualizarClientes = async (req, res) => {
    try {
      const cliente = await Cliente.findOneAndUpdate(
        { _id: req.params.id },req.body);
  
      if (!cliente) res.status(404).send("Cliente no encontrado");
      else
       res.json(cliente);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error al actualizar el cliente");
    }
  };*/

  exports.modificarCliente = async(req,res) => {

    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!cliente){
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(cliente)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el cliente');
    }
}