const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://thanhnien.vn/dong-vat-hoang-da-tags497033.html";

const getNews = async (req, res) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const mainItem = $(".box-category-item-main .item-first");
    const relatedItems = $(
      ".box-category-item-main .item-related .box-category-item"
    );

    const data = {
      main: null,
      related: [],
    };

    if (mainItem.length) {
      const title = mainItem.find(".box-category-link-title").text().trim();
      const href =
        "https://thanhnien.vn" +
        mainItem.find(".box-category-link-title").attr("href");
      const img = mainItem.find("img").attr("src");
      const sapo = mainItem.find(".box-category-sapo").text().trim();

      data.main = { title, href, img, sapo };
    }

    relatedItems.each((i, el) => {
      const title = $(el).find(".box-category-link-title").text().trim();
      const href =
        "https://thanhnien.vn" +
        $(el).find(".box-category-link-title").attr("href");
      const img = $(el).find("img").attr("src");

      data.related.push({ title, href, img });
    });

    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).send("Lỗi server");
  }
};

module.exports = getNews;
