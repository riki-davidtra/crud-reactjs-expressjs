-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2024 at 09:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tes`
--

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `uuid` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(225) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `uuid`, `created_at`, `updated_at`, `title`, `description`, `status`, `priority`, `due_date`, `user_id`) VALUES
(1, '96767026-9120-4950-a4be-b9ec7ed50a02', '2024-09-13 18:43:22', '2024-09-13 18:58:46', 'Dinas Luar Kota', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex veritatis doloribus dolor harum ullam ea.', 'pending', 'medium', '2024-09-12', 1),
(6, 'df9ca9c9-6856-4cc8-aa26-49b182e2e918', '2024-09-13 19:13:46', '2024-09-13 19:13:46', 'Dinas Luar Negeri', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex veritatis doloribus dolor harum ullam ea.', 'completed', 'high', '2024-09-28', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `full_name` varchar(225) NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `created_at`, `updated_at`, `full_name`, `nick_name`, `email`, `password`, `role_id`) VALUES
(1, 'ae28257e-ab62-4bd6-bee3-83eb1d828d02', '2024-09-13 18:41:38', '2024-09-13 19:13:03', 'Riki Davidtra', 'Riki', 'riki@gmail.com', '$2a$10$9uzXVuouaCv8e82IPX/pK.5RNLbMAe0xtuQ6pzV8pZoTS3bvF2Mbu', 1),
(2, 'd5136a49-2b84-4f1f-bf37-86fa80c2e773', '2024-09-13 18:42:09', '2024-09-13 18:42:09', 'David Tra', 'David', 'david@gmail.com', '$2a$10$8p2NeOijqpeQdE2DeMcq.Os8g6hSy3oIkGkX065iqBTaa.3In6dvq', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
