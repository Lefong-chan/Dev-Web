module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Robot automatique miditra ao amin'ny Shop2Game MENA ofisialy
        const response = await fetch('https://shop2game.com/api/auth/player_id_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                "app_id": 100067,
                "login_id": uid,
                "app_server_id": 0
            })
        });

        const data = await response.json();

        // Raha mahomby dia mivoaka ny nickname toy ny hita ao amin'ny Shop2Game
        if (data && data.nickname) {
            return res.status(200).json({
                success: true,
                nickname: data.nickname
            });
        } else {
            return res.status(404).json({
                success: false, 
                error: "Tsy hita ao amin'ny Shop2Game MENA io UID io."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error: Voasakan'ny Garena ny fifandraisana."
        });
    }
};
