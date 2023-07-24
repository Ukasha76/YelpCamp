const campground = require('../models/campground')

const locations = require('./cities')
const { places, things } = require('./seedhelper')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/firstapp')
  .then(() => {
    console.log('Mongoose listening')
  })
  .catch(err => {
    console.log('Erorr')
    console.log(err)
  })


const sample = array => array[Math.floor(Math.random() * array.length)]

const seeddb = async () => {
  await campground.deleteMany({})

  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * 440);

    const camp = new campground({
      author: '64b9a9e5d0495019e43b1728',
      tittle: ` ${sample(things)} ${sample(places)}`,
      location: `${locations[random].name}`,

      price: 300,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsum possimus laudantium dignissimos excepturi consequatur reprehenderit mollitia delectus odit officiis ratione corrupti nemo veritatis accusamus illo sed, hic ea iure culpa labore!',
      images: [
        {
          url: 'https://res.cloudinary.com/dzshuu8tz/image/upload/v1690031619/YelpCamp/lxg1chhlpvmnrhi4c2ga.png',
          filename: 'YelpCamp/lxg1chhlpvmnrhi4c2ga',

        },
        {
          url: 'https://res.cloudinary.com/dzshuu8tz/image/upload/v1690031619/YelpCamp/sch2eoiulcgubstlxrut.png',
          filename: 'YelpCamp/sch2eoiulcgubstlxrut',

        },
        {
          url: 'https://res.cloudinary.com/dzshuu8tz/image/upload/v1690031619/YelpCamp/nqqjurxliedkv1x3k6zb.png',
          filename: 'YelpCamp/nqqjurxliedkv1x3k6zb',

        }
      ]
    })
    await camp.save()
  }

}
seeddb()
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error occurred during seeding:', err);
    mongoose.connection.close();
  });





// const newcamp = new campground({
//     tittle: "New ground",
//     location: "Unknown"
// })
// newcamp.save()
