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

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      res.status(403).json({
        message: "Youre not allowed to access this data",
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



export default { authArtist , authUser};
