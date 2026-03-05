module.exports = async (req, res) => {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ success: false, error: "Mila UID!" });

    try {
        // Miantso ny robot an'ny Mocash (izay efa miditra ao amin'ny Shop2Game MENA)
        const response = await fetch(`https://api.mocash.id/v1/game/freefire?id=${uid}&zone=`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const data = await response.json();

        // Raha mahita ny anarana ilay robot
        if (data && data.data && data.data.username) {
            return res.status(200).json({
                success: true,
                nickname: data.data.username
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
            error: "Nisy olana teknika tamin'ny Robot. Andramo indray."
        });
    }
};
        
