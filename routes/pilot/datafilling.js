// Import necessary libraries
const express = require('express');
const router = express.Router();
const pool = require('../../Pilotdb'); // Import the PostgreSQL pool

let createdProjectName = ''; // Variable to store the created project name

// Add a new route to fetch the created project name
router.get('/created-project', async (req, res) => {
  try {
    res.json({ createdProjectName });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/description/:projectName', async (req, res) => {
  const { projectName } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM description WHERE project_name = $1', [projectName]);
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/mob_plan_schedule/:projectName', async (req, res) => {
  const { projectName } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mob_plan_schedule WHERE project_name = $1', [projectName]);
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/description', async (req, res) => {
  try {
    const client = await pool.connect();
    
    const { project_name, scope2, deliverables2, permission2, location2, sop_details2, equipments2, productivity2, manpower2, mob_plan_schedule2, constraints2, scope3, deliverables3, permission3, location3, sop_details3, equipments3, productivity3, manpower3, mob_plan_schedule3, constraints3} = req.body;


    // Insert into status table
    await client.query(
      `INSERT INTO status (project_name, scope, deliverables, permission, location, sop_details, equipments, productivity, manpower, mob_plan_schedule, constraints) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [project_name, scope2, deliverables2, permission2, location2, sop_details2, equipments2, productivity2, manpower2, mob_plan_schedule2, constraints2]
    );

    // Insert into immediate_action_required table
    await client.query(
      `INSERT INTO immediate_action_required (project_name, scope, deliverables, permission, location, sop_details, equipments, productivity, manpower, mob_plan_schedule, constraints) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [project_name, scope3, deliverables3, permission3, location3, sop_details3, equipments3, productivity3, manpower3, mob_plan_schedule3, constraints3]
    );



    
    client.release();

    res.status(200).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred' }); 
  }
});



module.exports = router;
