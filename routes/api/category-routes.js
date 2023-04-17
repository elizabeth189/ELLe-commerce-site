const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findByPK(req.params.id, {
      include: [Product],
    });
    if (!catData) {
      res
        .status(404)
        .json({ message: "Oh no! No category matches with this ID!" });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catData[0]) {
      res.status(404).json({ message: "No category with this id" });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categories) {
      res.status(404).json({ message: "No category found with this ID. " });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
