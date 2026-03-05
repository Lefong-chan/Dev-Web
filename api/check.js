module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Robot mampiasa ny API an'ny Smile.one (izay efa manana robot miditra ao amin'ny Garena)
        const response = await fetch("https://www.smile.one/api/v1/game/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"
            },
            body: JSON.stringify({
                "game": "freefire",
                "uid": uid
            })
        });

        const data = await response.json();

        // Raha mahita ny anarana ny robot
        if (data && data.username) {
            return res.status(200).json({
                success: true,
                nickname: data.username
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Tsy hita ao amin'ny server MENA io UID io."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Nisy olana teknika tamin'ny Robot. Andramo indray."
        });
    }
};
