const express = require('express');
const mongoose = require('mongoose');
const RES = require('../COMON');
const uri = RES.uri;
const School = require('../School');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const schools = await School.find();
        res.send(schools);
    
        console.log(schools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu từ cơ sở dữ liệu" });
    }
});

router.post('/them', async (req, res) => {
    try {
        const data = req.body;
        const newSchool = new School({
            name: data.name,
        });
        const result = await newSchool.save();
        res.status(201).json({
            status: 200,
            message: "Thêm thành công",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm dữ liệu vào cơ sở dữ liệu" });
    }
});

router.put('/sua/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const { name } = req.body;
        const existingSchool = await School.findById(_id);
        if (!existingSchool) {
            return res.status(404).json({ message: "Không tìm thấy trường" });
        }
        existingSchool.name = name;
        const updatedSchool = await existingSchool.save();
        res.status(200).json(updatedSchool);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi cập nhật dữ liệu trong cơ sở dữ liệu" });
    }
});

router.delete('/xoa/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const _id = req.params.id;
        const deletedSchool = await School.findOneAndDelete({ _id });
        if (deletedSchool) {
            res.status(200).json({
                message: "Xóa thành công",
                data: deletedSchool
            });
        } else {
            res.status(404).json({
                message: "Không tìm thấy trường học"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi xóa dữ liệu từ cơ sở dữ liệu" });
    }
});

router.get('/timkiem', async (req, res) => {

    try {
        await mongoose.connect(uri);
        const { name } = req.query;
        const schools = await School.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(schools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tìm kiếm dữ liệu từ cơ sở dữ liệu" });
    }
});

module.exports = router;
