import jwt from "jsonwebtoken";

const authArtist = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      message: "Unauthrised",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You have to acces to perform this operation",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unauthorised",
    });
  }
};

export default { authArtist };
