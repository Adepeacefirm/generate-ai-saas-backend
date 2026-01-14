import sql from "../config/db.js";

export const getUSerCreations = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const creations = await sql`SELECT * FROM creations WHERE id = ${id}`;

    const creation = creations[0];

    if (!creation) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    const currentLikes = (creation.likes || []).map((id) => String(id).trim());

    const userIdStr = String(userId).trim();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation liked";
    }

    await sql`UPDATE creations SET likes = ${updatedLikes} WHERE id = ${id}`;

    res.status(200).json({
      success: true,
      message,
      likesCount: updatedLikes.length,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
