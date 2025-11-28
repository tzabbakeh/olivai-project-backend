const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email requerido' });
  }

  try {
    const apiKey = process.env.BREVO_API_KEY;
    const listId = 3;

    const body = {
      email: email,
      listIds: [listId]
    };

    await axios.post('https://api.brevo.com/v3/contacts', body, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error al crear contacto en Brevo:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Error al suscribir' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Brevo escuchando en puerto ${PORT}`);
});
