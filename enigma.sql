-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Чрв 19 2020 р., 14:32
-- Версія сервера: 10.4.11-MariaDB
-- Версія PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `loonify`
--

-- --------------------------------------------------------

--
-- Структура таблиці `admin`
--

CREATE TABLE `admin` (
  `id` smallint(6) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `admin`
--

INSERT INTO `admin` (`id`, `password`) VALUES
(1, '698d51a19d8a121ce581499d7b701668');

-- --------------------------------------------------------

--
-- Структура таблиці `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `header` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `desc` varchar(2048) DEFAULT NULL,
  `sdesc` varchar(255) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `regdate` varchar(255) DEFAULT NULL,
  `status` enum('lost','found','theft','deactivated') DEFAULT NULL,
  `reward` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `posts`
--

INSERT INTO `posts` (`id`, `owner_id`, `uid`, `header`, `category`, `desc`, `sdesc`, `img`, `location`, `regdate`, `status`, `reward`) VALUES
(73, 143, '5e237ed602ba1', 'Пропав кіт', 'pets', 'Допоможіть знайти котика. 14.09. пропав котик в районі ДОКу, якщо хтось собі \"присвоїв\" - поверніть за винагороду. Якщо хтось бачив поділіться інформацією.\r\nОсобливі прикмети:\r\nКотик чорний, гладкошерстий, жовтозелені очі. Пронизливо мявкає, на правій передній лапі рубець. Звати Рін, на своє імя відкликається. Вміє проситися на руки.', 'Увечері о 18 годині пропав кіт на вулиці Томська 29', '{\"data\":{\"id\":\"Hnrp56X\",\"url_viewer\":\"https://ibb.co/Hnrp56X\",\"url\":\"https://i.ibb.co/Qr6jyLX/fb56cf231aa7.jpg\",\"display_url\":\"https://i.ibb.co/6g4JjzN/fb56cf231aa7.jpg\",\"title\":\"fb56cf231aa7\",\"time\":\"1579379334\",\"image\":{\"filename\":\"fb56cf231aa7.jpg\",\"name\":\"fb56cf231aa7\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/Qr6jyLX/fb56cf231aa7.jpg\",\"size\":301764},\"thumb\":{\"filename\":\"fb56cf231aa7.jpg\",\"name\":\"fb56cf231aa7\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/Hnrp56X/fb56cf231aa7.jpg\",\"size\":\"7922\"},\"medium\":{\"filename\":\"fb56cf231aa7.jpg\",\"name\":\"fb56cf231aa7\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/6g4JjzN/fb56cf231aa7.jpg\",\"size\":\"39738\"},\"delete_url\":\"https://ibb.co/Hnrp56X/0e5f1c8cc9485cc40d0b07c56bc6c354\"},\"success\":true,\"status\":200}', 'Шепетівка', '{\"seconds\":34,\"minutes\":55,\"hours\":22,\"mday\":18,\"wday\":6,\"mon\":1,\"year\":2020,\"yday\":17,\"weekday\":\"Saturday\",\"month\":\"January\",\"0\":1579384534}', 'lost', NULL),
(74, 143, '5e237f7bd70fc', 'Пропав собака', 'pets', 'іваіваіваів', 'Десь о 15 годині у центрі міста', '{\"data\":{\"id\":\"7CJWRp8\",\"url_viewer\":\"https://ibb.co/7CJWRp8\",\"url\":\"https://i.ibb.co/bmgB2vq/f4120cbad03a.png\",\"display_url\":\"https://i.ibb.co/54W8njt/f4120cbad03a.png\",\"title\":\"f4120cbad03a\",\"time\":\"1579384714\",\"image\":{\"filename\":\"f4120cbad03a.png\",\"name\":\"f4120cbad03a\",\"mime\":\"image/png\",\"extension\":\"png\",\"url\":\"https://i.ibb.co/bmgB2vq/f4120cbad03a.png\",\"size\":865920},\"thumb\":{\"filename\":\"f4120cbad03a.png\",\"name\":\"f4120cbad03a\",\"mime\":\"image/png\",\"extension\":\"png\",\"url\":\"https://i.ibb.co/7CJWRp8/f4120cbad03a.png\",\"size\":\"67337\"},\"medium\":{\"filename\":\"f4120cbad03a.png\",\"name\":\"f4120cbad03a\",\"mime\":\"image/png\",\"extension\":\"png\",\"url\":\"https://i.ibb.co/54W8njt/f4120cbad03a.png\",\"size\":\"430461\"},\"delete_url\":\"https://ibb.co/7CJWRp8/4dfd143c850fdfb2ff85cb2d81c4b3b3\"},\"success\":true,\"status\":200}', 'Луцьк', '{\"seconds\":19,\"minutes\":58,\"hours\":22,\"mday\":18,\"wday\":6,\"mon\":1,\"year\":2020,\"yday\":17,\"weekday\":\"Saturday\",\"month\":\"January\",\"0\":1579384699}', 'lost', NULL),
(75, 143, '5e237ff344d90', 'Знайшли телефон', 'devices', 'іфвіфлрівфліфвіфлоівф', 'іорарвіллавіло', '{\"data\":{\"id\":\"wc4NPVr\",\"url_viewer\":\"https://ibb.co/wc4NPVr\",\"url\":\"https://i.ibb.co/1zTfP1J/2c435939da15.jpg\",\"display_url\":\"https://i.ibb.co/SfBXMb7/2c435939da15.jpg\",\"title\":\"2c435939da15\",\"time\":\"1579384833\",\"image\":{\"filename\":\"2c435939da15.jpg\",\"name\":\"2c435939da15\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/1zTfP1J/2c435939da15.jpg\",\"size\":63038},\"thumb\":{\"filename\":\"2c435939da15.jpg\",\"name\":\"2c435939da15\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/wc4NPVr/2c435939da15.jpg\",\"size\":\"11072\"},\"medium\":{\"filename\":\"2c435939da15.jpg\",\"name\":\"2c435939da15\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/SfBXMb7/2c435939da15.jpg\",\"size\":\"110241\"},\"delete_url\":\"https://ibb.co/wc4NPVr/c86d47a3eea9c6537148ad7032ca9bb8\"},\"success\":true,\"status\":200}', 'Струмівка', '{\"seconds\":19,\"minutes\":0,\"hours\":23,\"mday\":18,\"wday\":6,\"mon\":1,\"year\":2020,\"yday\":17,\"weekday\":\"Saturday\",\"month\":\"January\",\"0\":1579384819}', 'found', NULL),
(76, 143, '5e23804b54fa2', 'Вкрали гаманець', 'preciousness', 'іваіваіваіваіваіваіва', 'фівфівфлдіовфівдофідолвфі', '{\"data\":{\"id\":\"WD1L3gs\",\"url_viewer\":\"https://ibb.co/WD1L3gs\",\"url\":\"https://i.ibb.co/1sxkn8b/2574bc052360.jpg\",\"display_url\":\"https://i.ibb.co/1sxkn8b/2574bc052360.jpg\",\"title\":\"2574bc052360\",\"time\":\"1579384924\",\"image\":{\"filename\":\"2574bc052360.jpg\",\"name\":\"2574bc052360\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/1sxkn8b/2574bc052360.jpg\",\"size\":4320},\"thumb\":{\"filename\":\"2574bc052360.jpg\",\"name\":\"2574bc052360\",\"mime\":\"image/jpeg\",\"extension\":\"jpg\",\"url\":\"https://i.ibb.co/WD1L3gs/2574bc052360.jpg\",\"size\":\"5857\"},\"delete_url\":\"https://ibb.co/WD1L3gs/90936094fdbb86c9d6dd155d5c09da91\"},\"success\":true,\"status\":200}', 'Підгайці', '{\"seconds\":47,\"minutes\":1,\"hours\":23,\"mday\":18,\"wday\":6,\"mon\":1,\"year\":2020,\"yday\":17,\"weekday\":\"Saturday\",\"month\":\"January\",\"0\":1579384907}', 'theft', NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `checked1` tinyint(1) DEFAULT NULL,
  `checked2` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `regdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `users`
--

INSERT INTO `users` (`id`, `uid`, `name`, `email`, `password`, `login`, `phone`, `adress`, `checked1`, `checked2`, `status`, `regdate`) VALUES
(141, '5df25896f204d', 'Asdasdas', 'asdasdasdasd@asdasdas.asa', '$2y$10$MQjFkknAGgD/5VGY2sz5z.QsPhY/OEeqO5kmsT7.HEH3IMp9zjjzq', 'asdasdasdasd', '78768767876', '0', 1, 0, 0, '2019-12-12 16:11:18'),
(142, '5dfe3400e8a02', 'Asdjasgdgjashdh', 'dasjkdashgj@sadasda.saas', '$2y$10$EVqv0P6Wk6c9u2cw1k2EfuIl.OO7nFSk8tJMNf4ATu9Gsf4zT0Egm', 'dasjkdashgj', '867567575565656', '0', 1, 0, 0, '2019-12-21 16:02:24'),
(143, '5e0dd419d6435', 'Google', 'google@google.com', '$2y$10$1dKsGX58BVvLM3Yfq9D/NePlJgelC/v0P/wG2/rWBCE1fc1sN/ayW', 'google', '273462354723', '0', 1, 0, 0, '2020-01-02 12:29:29'),
(144, '5e206c006a0ce', 'Tartas', 'taras.shparuk@gmail.com', '$2y$10$MeVzRO9dWOaR39JYq1OxaeFVXHOx4D6tCQ3lPtv8U03.HP/Vg.mP2', 'taras.shparuk', NULL, '0', 1, 0, 0, '2020-01-16 14:58:24'),
(145, '5e206c8731953', 'Ajsdashdghj', 'kjasdjsk@asdasd.asda', '$2y$10$9WanHjdGVy2BMgv771PEteaG7eHvrn0lBe61/0n9uxOmdVuR/HUqO', 'kjasdjsk', NULL, '0', 1, 0, 0, '2020-01-16 15:00:39'),
(146, '5e2074b8ad2cd', 'Wassa', 'cgjn@gjg.oj', '$2y$10$dCmXiRhJLSNR9kaaZlAjFOorAanaCl4IWVsQuG6CSsJAP8fjSuJuG', 'cgjn', NULL, '0', 1, 0, 0, '2020-01-16 15:35:36'),
(147, '5e2078cacf03b', 'Test', 'fdfhfjhgkj@gmail.com', '$2y$10$NleHeeJ64.9ZxhLLIHnrLuNbJvt3bcGLB2OLwwH8xpHwavc/nb8/y', 'fdfhfjhgkj', NULL, '0', 1, 0, 0, '2020-01-16 15:52:58'),
(148, '5e21ff4fe4944', 'Inna', 'i.soltusyk@chaspik.ua', '$2y$10$oU0cEpSPbaUDHD3w3MBTx.3bXOIGiHc.r0g4UVDAaCNiMwvYv2nXq', 'i.soltusyk', NULL, '0', 1, 1, NULL, '2020-01-17 19:39:11'),
(149, '5e232001d4cc8', 'Рыфвпфыоої', 'sadas@aasd.as', '$2y$10$d2sDi4oPhsh1rHON3pOANehv7E0yWgKQB5ArJfrdeFwrX/c7g.Stu', 'sadas', NULL, NULL, 1, 0, NULL, '2020-01-18 16:10:57'),
(150, '5e2371670488b', 'LIdfhlsksdf', 'kkajsjkjsak@asdhjsadas.as', '$2y$10$FH6BX4kLMIXYCZQJnLFzO.kYYcgqUoIKII2vGiFgKTPncKtuovlEe', 'kkajsjkjsak', '56756765756', NULL, 1, 1, NULL, '2020-01-18 21:58:15');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_posts_owner_id` (`owner_id`);

--
-- Індекси таблиці `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT для таблиці `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `posts`
--
ALTER TABLE `posts`
  git@gitlab.ideil.com:queens/suli-guli.git
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
