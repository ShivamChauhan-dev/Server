const express = require('express');
const router = express.Router();
const pool = require('../../Admindb'); // Import the PostgreSQL pool

router.post('/description', async (req, res) => {
  try {
    const client = await pool.connect();
    
    const { project_name, scope1, deliverables1, permission1, location1, sop_details1, equipments1, productivity1, manpower1, mob_plan_schedule1, constraints1, scope2, deliverables2, permission2, location2, sop_details2, equipments2, productivity2, manpower2, mob_plan_schedule2, constraints2, scope3, deliverables3, permission3, location3, sop_details3, equipments3, productivity3, manpower3, mob_plan_schedule3, constraints3, date1, description1, name_of_the_person1, date2, description2, name_of_the_person2,customer, dd_project, pmo_office_coordinator, as_update_on_date } = req.body;

    // Insert into description table
    await client.query(
      `INSERT INTO description (project_name, scope, deliverables, permission, location, sop_details, equipments, productivity, manpower, mob_plan_schedule, constraints) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [project_name, scope1, deliverables1, permission1, location1, sop_details1, equipments1, productivity1, manpower1, mob_plan_schedule1, constraints1]
    );

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

    // Insert into mob_plan_schedule table
    await client.query(
      `INSERT INTO mob_plan_schedule (project_name, date1, description1, name_of_the_person1, date2, description2, name_of_the_person2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [project_name, date1, description1, name_of_the_person1, date2, description2, name_of_the_person2]
    );

    await client.query(
      'INSERT INTO projects (project_name, customer, dd_project, pmo_office_coordinator, as_update_on_date) VALUES ($1, $2, $3, $4, $5) RETURNING id, project_name',
      [project_name, customer, dd_project, pmo_office_coordinator, as_update_on_date]
    );
    
    client.release();

    res.status(200).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred' }); 
  }
});

router.post('/checklist', async (req, res) => {
  const { project_name, Before_takeoff, After_takeoff, After_Landing } = req.body;
  const insertQuery = `
    INSERT INTO checklist (project_name, Before_takeoff, After_takeoff, After_Landing)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  try {
    const result = await pool.query(insertQuery, [project_name, Before_takeoff, After_takeoff, After_Landing]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating checklist entry:', error);
    res.status(400).json({ error: 'Could not create checklist entry' });
  }
});

// router.post('/dpr', async (req, res) => {
//   try {
//     const client = await pool.connect();
    
//     const { project_name, name, designation, phone, hours_at_site, start_time1, weather_forecast1, wind_speed1, visibility1, start_time2,weather_forecast2, wind_speed2, visibility2, equipment, serial_no, health_condition, remarks, prepared, checked, approved, signature1, signature2, signature3, flight_no, equipment2, flight_start_time, flight_end_time, remark, total_work, total_done, todays_work, total_remaining} = req.body;

//     // Insert into description table
//     await client.query(
//       `INSERT INTO dpr1 (project_name,name, designation, phone, hours_at_site) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [project_name, name, designation, phone, hours_at_site]
//     );

//     // Insert into status table
//     await client.query(
//       `INSERT INTO dpr2today (project_name,start_time, weather_forecast, wind_speed, visibility) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [project_name, start_time1, weather_forecast1, wind_speed1, visibility1]
//     );

//     // Insert into immediate_action_required table
//     await client.query(
//       `INSERT INTO dpr2next_day (project_name,start_time,weather_forecast, wind_speed, visibility) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [project_name, start_time2,weather_forecast2, wind_speed2, visibility2]
//     );

//     // Insert into mob_plan_schedule table
//     await client.query(
//       `INSERT INTO dpr3 (project_name, equipment, serial_no, health_condition, remarks) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [project_name, equipment, serial_no, health_condition, remarks]
//     );

//     await client.query(
//       'INSERT INTO dpr4 (project_name, prepared, checked, approved, signature1, signature2, signature3) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//       [project_name, prepared, checked, approved, signature1, signature2, signature3]
//     );
    
//     await client.query(
//       'INSERT INTO dpr5 (project_name,  flight_no, equipment, flight_start_time, flight_end_time, remark) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//       [project_name, flight_no, equipment2, flight_start_time, flight_end_time, remark]
//     );
    
//     await client.query(
//       'INSERT INTO dpr6 (project_name, total_work, total_done, todays_work, total_remaining) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [project_name, total_work, total_done, todays_work, total_remaining]
//     );
    

//     client.release();

//     res.status(200).json({ message: 'DPR Data inserted successfully.' });
//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).json({ error: 'An error occurred' }); 
//   }
// });

router.post('/inventories', async (req, res) => {
  const { Category, SubCategory, Abbreviation, Make, ModelProductNo, SerialNoProductID, Dept, InternalSINo, SKUCode, Name, Remark } = req.body;

  try {

    await pool.query(
      'INSERT INTO inventories (Category, SubCategory, Abbreviation, Make, ModelProductNo, SerialNoProductID, Dept, InternalSINo, SKUCode, Name, Remark) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [Category, SubCategory, Abbreviation, Make, ModelProductNo, SerialNoProductID, Dept, InternalSINo, SKUCode, Name, Remark]
    );

    res.status(201).json({ message: 'Inventory created successfully' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating product' });
  }
});



// Create a new repair list item
router.post('/repair-list', async (req, res) => {
  const { Date, TypeOfItems, Brand, SerialNoProductId, Quantity, RepairedStatus, Remark } = req.body;

  try {
    await pool.query(
      'INSERT INTO RepairList (Date, TypeOfItems, Brand, SerialNoProductId, Quantity, RepairedStatus, Remark) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [Date, TypeOfItems, Brand, SerialNoProductId, Quantity, RepairedStatus, Remark]
    );
    res.status(201).json({ message: 'Repair list item created successfully.' });
  } catch (error) {
    console.error('Error creating repair list item:', error);
    res.status(500).json({ error: 'An error occurred while creating repair list item.' });
  }
});

// Create a new shipment
router.post('/shipments', async (req, res) => {
  const {
    Date,TypeOfItems, Brand,  SerialNoProductId,  Quantity,  TransferLocation,  TransferDestination,  ShippedBy,  Repair,  SentByEmployee,} = req.body;

  try {
    await pool.query(
      'INSERT INTO ItemShipment (Date, TypeOfItems, Brand, SerialNoProductId, Quantity, TransferLocation, TransferDestination, ShippedBy, Repair, SentByEmployee) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        Date,  TypeOfItems,  Brand,  SerialNoProductId,  Quantity,  TransferLocation,  TransferDestination,  ShippedBy,  Repair,  SentByEmployee,]
    );
    res.status(201).json({ message: 'Shipment created successfully' });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ error: 'An error occurred while creating the shipment' });
  }
});

// Get all tenderform records
router.get('/tenderform', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tenderform');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Insert a new tenderform record
router.post('/tenderform', async (req, res) => {
  const {
    slNo, tenderTitle, department, modeOfSubmission, location, dateOfSubmission, emd, dateOfBidOpening, ourParticipationStatus, reasonForNonParticipation, l1, l2, l3, l4, l5, remarks,
  } = req.body;

  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO tenderform VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
      [ slNo, tenderTitle, department, modeOfSubmission, location, dateOfSubmission, emd, dateOfBidOpening, ourParticipationStatus, reasonForNonParticipation, l1, l2, l3, l4, l5, remarks ]
    );
    client.release();
    res.status(201).json({ message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get employee details by empCode
router.get('/employeedetails/:empCode', async (req, res) => {
  const empCode = req.params.empCode;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM employedetails WHERE empCode = $1', [empCode]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      const data = result.rows[0];
      client.release();
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Insert a new employeedetails record
router.post('/employeedetails', async (req, res) => {
  const {
    empCode, name, designation, contactNo, dob, doj, bloodGroup, gender, highestQualification, emergencyContactNo, medicalInsuranceNo, esiNo, uanNo, panNo, aadharNo, rpc,
  } = req.body;

  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO employedetails VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
      [
        empCode, name, designation, contactNo, dob, doj, bloodGroup, gender, highestQualification, emergencyContactNo, medicalInsuranceNo, esiNo, uanNo, panNo, aadharNo, rpc,
      ]
    );
    client.release();
    res.status(201).json({ message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new indent form
router.post('/indentforms', async (req, res) => {
  const { ReferenceNumber, Department, ProductDescription, Reason, PreparedBy, CheckedBy, ApprovedBy, Self, Account } = req.body;
  
  try {
    const query = 'INSERT INTO indentform (ReferenceNumber, Department, ProductDescription, Reason, PreparedBy, CheckedBy, ApprovedBy, Self, Account) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [ReferenceNumber, Department, ProductDescription, Reason, PreparedBy, CheckedBy, ApprovedBy, Self, Account];
    
    await pool.query(query, values);
    res.status(201).json({ message: 'Indent form created successfully' });
  } catch (error) {
    console.error('Error creating indent form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new indent form
router.post('/indentformsitems', async (req, res) => {
  try {
    const {  ReferenceNumber,  Item,  QTY, UnitPrice, AmountExcludingTax,  Remarks} = req.body;

    const query = `
      INSERT INTO indentformitems(ReferenceNumber, Item, QTY, Unit Price, Amount Excluding Tax, Remarks)
      VALUES ($1, $2, $3, $4, $5, $6);
      RETURNING *;
    `;

    const values = [ReferenceNumber,Item, QTY, UnitPrice, AmountExcludingTax, Remarks];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
