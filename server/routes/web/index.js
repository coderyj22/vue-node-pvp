module.exports = app => {
  const router = require('express').Router()

  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Hero = mongoose.model('Hero')

  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({ name: "英雄分类" })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      },
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: "热门",
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })
    res.send(cats)
  })

  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({ name: "新闻分类" })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: "热门",
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cats
    })
    res.send(cats)
  })

  router.get('/news/:id',async(req,res) => {
    console.log(req.params.id)
    const article = await Article.findById(req.params.id)
    
    res.send(article)
  })

  app.use('/web/api', router)
}
