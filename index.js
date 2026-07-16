import express from "express";

// create server
const app = express();
const PORT = 5000;

// middleware อ่าน json จาก request body
app.use(express.json())

// DB array
let products = [
    { id: 1, name: "laptop", price: 29900},
    { id: 2, name: "SmartPhone", price: 15500},
    { id: 3, name: "Tablet", price: 12500}
]

// Routing
app.get("/", (req, res)=>{
    res.status(200).json("wellcome to my first RESTful api");
})

// get all products
app.get("/api/products", (req,res)=>{
    res.status(200).json(products)
})

// get product by id
app.get("/api/products/:id", (req,res)=>{
                      //แปลงจาก string เป็น number
    const productId = Number(req.params.id)

    // find ลูปหาของใน products และหาว่ามี id ที่ตรงกับที่ต้องการหาไหม
    const product = products.find((p) => p.id === productId)
    if (!product) {
        res.status(404).json({ message: "No id found"})
    }

    res.status(200).json(product)
});

// create product
app.post("/api/products", (req,res)=>{
    const {name, price} = req.body
    
    // check if no send
    if ( !name || !price ) {
        res.status(400).json({message: "name and price are required"})
    }

    const newProduct = {
        // id = จำนวนของ product เช็คว่า มากกว่า 0 ไหม โดย... คือการสลายโครงสร้างเดิมของ products และลูปข้อมูลออกมาดู ถ้ามากกว่าให้หาตัวที่มากที่สุดแล้ว +1 ถ้าไม่ ก็เป็น 1 เพราะไม่เคยมี
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: name,
        price: Number(price)
    };

    // push product or create product
    return products.push(newProduct);
    return res.status(201).json({message: "product created",
        data: newProduct
    });
});

// update product by id
app.put("/api/products/:id", (req,res)=>{
    // รับ name และ price
    const {name, price} = req.body;
    // รับ id
    const productId = Number(req.params.id);
    // ลูป หาตำแหน่งใน index
    const productIndex = products.findIndex(p => p.id === productId);

    // ถ้ามไม่เจอ หรือ === -1 ให้ขึ้น error
    if (productIndex === -1) {
        res.status(404).json({ message: "No id found"});
    }

    // setvalue ให้แต่ละค่า ถ้าไม่มีค่่าใหม่ก็ใช้อันเดิม
    products[productIndex] = {
        id:productId,
        name: name || products[productIndex].name,
        price: Number(price) || products[productIndex].price,
    }
    return res.status(200).json(products[productIndex]);
})

// delete product by id
app.delete("/api/products/:id", (req,res)=>{
    const productId = Number(req.params.id)
    const productIndex = products.findIndex((p) => p.id === productId)
    if (productIndex === -1) {
        res.status(404).json({ message: "No id found"})
    }
    
    const deletedProduct = products.splice(productIndex, 1)
    return res.status(200).json({message: "deleted success",
        deletedProduct: deletedProduct[0]})

})

//ดักฟัง request
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})