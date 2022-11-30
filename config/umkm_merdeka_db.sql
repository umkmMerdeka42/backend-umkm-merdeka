-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220619.196dad2777
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2022 at 06:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `umkm_merdeka_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `uuid`, `productName`, `price`, `image`, `url`, `category`, `description`, `userId`, `createdAt`, `updatedAt`) VALUES
(21, 'a2fbde85-fe8a-4a1f-954b-4998c4ceb4d1', 'Dimsum', 5000, '3e475119e7e6b168befc4291a9ee984b.jpeg', 'http://localhost:5000/images/3e475119e7e6b168befc4291a9ee984b.jpeg', 'Makanan', 'Dimsum Nafasya Enak Banget Lohh', 4, '2022-11-30 16:51:11', '2022-11-30 16:59:49'),
(23, 'bd7d6df2-8415-4a9b-96c1-df90a6fa522e', 'Seblak', 15000, '8c7f6f551fba18ad8af384f30028cc41.jpg', 'http://localhost:5000/images/8c7f6f551fba18ad8af384f30028cc41.jpg', 'Makanan', 'Seblak bang ikhsan pedes polll', 5, '2022-11-30 16:56:31', '2022-11-30 16:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('0of9FF1siKFSi2jZqodc79CixAvojVGr', '2022-12-01 17:00:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2022-11-30 14:49:42', '2022-11-30 17:00:40'),
('aQyCRN6Y8yzcr66ONJH0A1XdVD3lQJZz', '2022-12-01 17:00:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"346d33e1-108a-419a-a43c-f5d7f5769b91\"}', '2022-11-30 16:48:51', '2022-11-30 17:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `nim` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `telephone`, `university`, `nim`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '15a1581f-7f02-4f01-8343-3c7060f8d4fa', 'M Aji Perdana', 'ajicooljazz38@gmail.com', '085695951121', 'Universitas Bandar Lampung', '19411011', '$argon2id$v=19$m=65536,t=3,p=4$qfDNz6KY/HxFl/tuUxQARw$6lQAfq/8Dg8J732QmrAB2H/dY61FEXGgb4beGcnvlnQ', 'admin', '2022-11-30 13:21:59', '2022-11-30 13:21:59'),
(4, '346d33e1-108a-419a-a43c-f5d7f5769b91', 'Nafasya Rahma Safitra', 'nafasyac22087@gmail.com', '081993544774', 'Universitas Bandar Lampung', '20021064', '$argon2id$v=19$m=65536,t=3,p=4$FuJ+oufwQuWoVPMVrdS6lQ$ZS+HqmCiiyVFSvSV+i4xiKjhO00O7I6qUtdT20cQtEE', 'user', '2022-11-30 15:44:32', '2022-11-30 15:44:32'),
(5, 'b155c9a4-2a2d-4271-a16f-e05e4d86110d', 'M Al Ikhsan Rangkuti', 'mhd.al.ikhsan24@gmail.com', '081372444933', 'Universitas Muhammadiyah Riau', '200401071', '$argon2id$v=19$m=65536,t=3,p=4$3r0HvAZnLTQvBxq5PXU6Zw$eo8xe74HGMuuAMQ3b2RdnXQq2yCpIybGRxIAN1RuEYI', 'user', '2022-11-30 15:46:40', '2022-11-30 15:46:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



