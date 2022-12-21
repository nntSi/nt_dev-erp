const Mainmenu = require("../models/Mainmenu");
const Submenu = require("../models/Submenu");

module.exports.getmenuByPrivi = async (privi) => {
  let menu = [];
  const mainmenus = await Mainmenu.findAll();
  for (let i = 0; i < mainmenus.length; i++) {
    /* console.log(mainmenus[i].dataValues); */
    let privi_split = mainmenus[i].dataValues.privi.split(",");
    let state = 0;
    for (let k = 0; k < privi_split.length; k++) {
      if (Number(privi) == Number(privi_split[k])) {
        state += 1;
      }
    }
    if (state >= 1) {
      let sub_menu = [];
      if (mainmenus[i].dataValues.sub_menu != null) {
        let sub_split = mainmenus[i].dataValues.sub_menu.split(",");
        for (let j = 0; j < sub_split.length; j++) {
          const submenus = await Submenu.findAll({
            where: {
              id: Number(sub_split[j]),
            },
          });
          sub_menu[j] = submenus[0].dataValues;
        }
      }
      menu[i] = {
        main: mainmenus[i].dataValues,
        sub: sub_menu,
      };
    }
  }
  return menu;
}

// input = "1,2,3"
module.exports.getMenuByMenuSelected = async (input_privi) => {
  let split_input = input_privi.split(",");
  let menu = [];
  for (let i = 0; i < split_input.length; i++){
    let mainmenus = await Mainmenu.findAll({
      where: {
        id: Number(split_input[i])
      }
    });
    let sub_menu = [];
      if (mainmenus[0].dataValues.sub_menu != null) {
        let sub_split = mainmenus[0].dataValues.sub_menu.split(",");
        for (let j = 0; j < sub_split.length; j++) {
          const submenus = await Submenu.findAll({
            where: {
              id: Number(sub_split[j]),
            },
          });
          sub_menu[j] = submenus[0].dataValues;
        }
      }
      menu[i] = {
        main: mainmenus[0].dataValues,
        sub: sub_menu,
      };
  }
  return menu;
}
