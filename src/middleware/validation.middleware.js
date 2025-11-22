import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {
  // Set up validation rules
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

  // Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // Check if there are any errors after running the rules
  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;
