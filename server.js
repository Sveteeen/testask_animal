const express = require('express');
const app = express();
const PORT = 3001;

const {
    getPet,
    createPet,
    updateStatus,
    feedPet,
    healPet,
    playPet
} = require('./pet');

app.use(express.json());

// Обновляем состояние питомца каждую минуту
setInterval(() => {
    updateStatus();
}, 60000);

// получаем текущее состояние
app.get('/pet', (req, res) => {
    const currentPet = getPet();
    if (!currentPet) {
        return res.status(404).json({message: "Питомец не создан"});
    }
    updateStatus();
    res.json(getPet());
})

// Создать нового питомца
app.post('/pet', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Укажите имя питомца' });
    }
    
    const currentPet = getPet();
    if (currentPet && currentPet.status !== 'dead') {
        return res.status(400).json({ message: 'Питомец уже существует' });
    }

    createPet(name);
    res.status(201).json(getPet());
});

// Покормить питомца
app.post('/pet/feed', (req, res) => {
    const currentPet = getPet();
    if (!currentPet) {
        return res.status(404).json({ message: 'Питомец не создан' });
    }

    if (!feedPet()) {
        return res.status(400).json({ message: 'Питомец мёртв' });
    }

    res.json(getPet());
});

// Лечить питомца
app.post('/pet/heal', (req, res) => {
    const currentPet = getPet();
    if (!getPet) {
        return res.status(404).json({ message: 'Питомец не создан' });
    }

    if (!healPet()) {
        return res.status(400).json({ message: 'Питомец мёртв' });
    }

    res.json(getPet());
});

// Играть с питомцем
app.post('/pet/play', (req, res) => {
    const currentPet = getPet();
    if (!currentPet) {
        return res.status(404).json({ message: 'Питомец не создан' });
    }

    if (!playPet()) {
        return res.status(400).json({ message: 'Питомец мёртв' });
    }

    res.json(getPet());
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});