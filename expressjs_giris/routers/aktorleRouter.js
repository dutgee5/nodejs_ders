const router = require("express").Router(); // express modülünden router objesini import ettik.
const errorHandling = require("../middlewares/errorHandling");

const data_model_functions = require("../data/data-model");
const e = require("express");

router.get("/", (req, res,next) => {
  data_model_functions
    .findActor()
    .then((istedigimiz_sey) => {
      res.status(200).json(istedigimiz_sey);
    })
    .catch((error) => {
      next({
        statusCodee: 500,
        errorMessage: "Aktörler getirilirken hata oluştu",
        error,
      });
    });
});
// req.params, req.query, req.body
// req.params: URL'de belirtilen id degerini almak için kullanılır.
// req.query: sunucuya gelen istektekten veri okumka için kullanılır.
// req.body: POST metodu ile gelen veriyi okumak için kullanılır.

router.post("/", (req, res, next) => {
  const new_actor = req.body; // request body'den gelen veriyi aldık.

  if (!new_actor.name) {
    next({ statusCode: 400, errorMessage: "Aktör adı zorunludur." });
  }
  data_model_functions
    .addActor(new_actor)
    .then((istedigimiz_sey) => {
      res.status(201).json(istedigimiz_sey);
    })
    .catch((error) => {
      next({
        // serverdan dönen hata mesajı
        statusCode: 500,
        errorMessage: "Aktör eklenirken hata oluştu",
        error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  data_model_functions
    .findActorById(req.params.id)
    .then((boyle_bir_id_varmi) => {
      data_model_functions
        .deleteActor(req.params.id)
        .then((istedigimiz_sey) => {
          if (istedigimiz_sey) {
            res.status(204).end();
          }
          next({
            statusCode: 400,
            errorMessage: "Silmek istediğiniz aktör sistemde bulunamadı",
          });
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Aktör silinirken hata oluştu",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Sistem Hatası",
        error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  data_model_functions
    .findActorById(req.params.id)
    .then((istedigimiz_sey) => {
      if (!istedigimiz_sey) {
        next({
          statusCode: 400,
          errorMessage: "Aktor bulunamadı",
        });
      }
      res.status(200).json(istedigimiz_sey);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktör getirilirken hata oluştu",
        error,
      });
    });
});

/* id req.paramsdan al, duzenlenen aktor degerini req.bodyden al,dizi içinde id ile aktor var mi varsa bilgileri degistir 200 koduyla yeni aktore gonder yoksa 404*/
router.put("/:id", (req, res) => {
  //put metodu bütün bu değişiklikleri yapmak için kullanılır.
  const edited_actor_id = req.params.id;
  const edited_actor = req.body;
  const actor = data.find((actor) => actor.id === Number(edited_actor_id)); // id'si eşleşen aktörü bulduk.
  if (actor) {
    data = data.map((actor) =>
      actor.id === Number(edited_actor_id) ? edited_actor : actor
    );
    res.status(200).json(edited_actor);
  } else {
    res.status(404).json({ message: "Aktor bulunamadı" });
  }
});

router.patch("/:id", (req, res, next) => {
  //patch metodu sadece belirli bir kısmı değiştirmek için kullanılır. yama olaraktan düşünülebilir.
  const { id } = req.params; // id'yi aldık.
  const updated_actor = req.body; // request body'den gelen veriyi aldık.

  if (!updated_actor.name) {
    next({ statusCode: 400, errorMessage: "Aktör adı zorunludur." });
  }
  data_model_functions
    .updateActor(updated_actor, id)
    .then((istedigimiz_sey) => {
      res.status(200).json(istedigimiz_sey);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Aktör güncellenirken hata oluştu",
        error,
      });
    });
});

module.exports = router; // router objesini export ettik.
