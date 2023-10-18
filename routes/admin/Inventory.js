const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const path = require('path');

router.get('/Current-Inventory', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'inventory.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Excel data' });
    }
});

router.get('/RepairList', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'repairlist.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Excel data' });
    }
});

router.get('/Curre', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'inventory.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Excel data' });
    }
});

module.exports = router;