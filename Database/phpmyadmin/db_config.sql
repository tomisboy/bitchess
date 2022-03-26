SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `bitchess`
--

-- --------------------------------------------------------

--
-- Table structure for table `botgames`
--

CREATE TABLE `botgames` (
  `id` int(11) NOT NULL,
  `playerid` int(11) NOT NULL,
  `board` text COLLATE utf8_bin NOT NULL,
  `moves` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `playerone` int(11) NOT NULL,
  `playertwo` int(11) NOT NULL,
  `board` text COLLATE utf8_bin NOT NULL,
  `moves` text COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL,
  `socketid` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `library`
--

CREATE TABLE `library` (
  `id` int(11) NOT NULL,
  `playerone` int(11) NOT NULL,
  `playertwo` int(11) NOT NULL,
  `moves` text COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` text COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `id`, `rating`) VALUES
('alex@alex.alex', 'alex@alex.alex', '$2b$10$B.Bhk7auEWXbLC4rIi.OGeBeBZvvIlfaksDmKPXSWu8kL1coflJFO', 1, 800),
('jonas@jonas.jonas', 'jonas@jonas.jonas', '$2b$10$IW5Gemt9a75HhVf0RopzHu9YU1430J9erQAnFnSPc8MsbkBsyaSa.', 7, 800),
('thomas@thomas.thomas', 'thomas@thomas.thomas', '$2b$10$ElmfbEzAXZpfUaJSrrtDzOIGmjs9fLkBerZB0plmMFTqB7t4PiYXG', 9, 800);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `botgames`
--
ALTER TABLE `botgames`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `botgames`
--
ALTER TABLE `botgames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;