import mongoose from "mongoose";
import { withIronSession } from "next-iron-session";
import { User } from "../../schemas/user";
import { url } from "../../utils/connection";

export default withIronSession(
  async (req, res) => {
    const { method } = req;

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    if (method === "POST") {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email, password });

      if (foundUser) {
        req.session.set("user", foundUser);
        await req.session.save();
        return res.status(201).json(foundUser.isBroker);
      }
      return res.status(403).send("");
    }

    if (method === "DELETE") {
      req.session.unset("user");
      await req.session.save();
      return res.status(201).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "AUTH_COOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
