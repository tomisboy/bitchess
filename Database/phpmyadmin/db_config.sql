-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Erstellungszeit: 06. Mai 2022 um 09:01
-- Server-Version: 10.3.34-MariaDB-1:10.3.34+maria~focal
-- PHP-Version: 8.0.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Datenbank: `bitchess`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `botgames`
--

CREATE TABLE `botgames` (
  `id` int(11) NOT NULL,
  `playerid` int(11) NOT NULL,
  `board` text COLLATE utf8_bin NOT NULL,
  `moves` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `botgames`
--

INSERT INTO `botgames` (`id`, `playerid`, `board`, `moves`) VALUES
(2, 7, 'rnbqkbnr/ppppp1pp/2P2p2/3P4/5P1P/8/PN4PP/R3R3', ''),
(3, 10, 'rnqqrKnr/ppp2ppp/4n3/4N3/1p2P1PP/5Q2/PPPP1P2/RNB2B1R', ''),
(4, 13, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', ''),
(5, 11, '8/8/4P3/7R/2R1NP1R/4N1RR/1QR3RR/QRR5', ''),
(7, 1, 'NnbQRbnr/PPPPpppp/8/7n/Q3Q3/4K3/2QP1PPP/R1B2BN1', ''),
(8, 14, 'r1bq1b1r/pp4pp/1n1p4/P1B1p3/3QP1NP/1p3P2/PPnP1QP1/RN2KB1R', ''),
(9, 15, 'KKKKKKKK/QQQQQQQQ/BBBBBBBB/BBBBBBBB/NNNNNNNN/RRRRRRRR/PPPPPPPP/kkkkkkkk', ''),
(10, 16, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', ''),
(11, 17, 'rnbqPbnr/p1p3pp/8/8/4P3/8/PPPP2PP/RNBQKBNR', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `playerone` int(11) NOT NULL,
  `playertwo` int(11) DEFAULT NULL,
  `board` text COLLATE utf8_bin NOT NULL,
  `moves` text COLLATE utf8_bin NOT NULL,
  `date` text COLLATE utf8_bin NOT NULL,
  `socketid` text COLLATE utf8_bin NOT NULL,
  `public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `playerone`, `playertwo`, `board`, `moves`, `date`, `socketid`, `public`) VALUES
(32, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650705108688', 'f0vMy647GK5a', 1),
(33, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650705888124', '1Rjq6zBiBcyN', 1),
(34, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650706100909', 'DqgYoWTGPflL', 1),
(35, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650708932040', 'bW5dmVD4Re27', 1),
(36, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650709221441', 'GaWmVobTEadI', 1),
(37, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650710418887', 'q5gxKVEmek76', 1),
(38, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650714146451', 'pe03PegIAcAl', 1),
(39, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650714160030', 'TBfdYjQMVmow', 1),
(40, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650716657905', 'fQuHjhMFimQE', 1),
(41, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1650716859884', 'P2rqkh6jGakb', 1),
(42, 1, NULL, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', '', '1651220989704', 'wsXOS318ZCqs', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `library`
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
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `username` text COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `gameswon` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `id`, `rating`, `gameswon`) VALUES
('alex', 'alex@alex.alex', '$2b$10$B.Bhk7auEWXbLC4rIi.OGeBeBZvvIlfaksDmKPXSWu8kL1coflJFO', 1, 3184, 10),
('jonas1', 'jonas@jonas.jonas', '$2b$10$IW5Gemt9a75HhVf0RopzHu9YU1430J9erQAnFnSPc8MsbkBsyaSa.', 7, 68, 44),
('thomas', 'thomas@thomas.thomas', '$2b$10$ElmfbEzAXZpfUaJSrrtDzOIGmjs9fLkBerZB0plmMFTqB7t4PiYXG', 9, 900, 22),
('thomas2', 'thomasalpert@gmail.com', '$2b$10$i4Rur.AcpUl9CT2/mNtS9uJSbGA9ik9C8har2xlqNB48kA3//r.8G', 11, 985, 1),
('lucas@lucas.lucas', 'lucas@lucas.lucas', '$2b$10$e3aIVTxqM2UUS59Nzs5v8OIy7ARcfsj..WH5mqwWihsYCpSwRs7Se', 13, 800, 0),
('Gerhard Lutz', 'gerhard.lutz@gmx.net', '$2b$10$Y7yXe95jSThHmBZZ3EMH6.xfDchrORkpgjSmWRR8Zk30Lv/KE6Fue', 14, 800, 0),
('AlexStinkt', 'alexstinkt@mail.de', '$2b$10$AnyDyR/gbU3Mcc7/EnpnYOfvMN83/6bLZ7VVcmIBWPkAXLd0R.u7q', 15, 800, 0),
('DerWilde', 'DerWilde@DerWilde.DerWilde', '$2b$10$Y2h.tRJ.wArIQNacfkKa9.U9TD350hfbzPuN7rG0gElRnXPoAs/vu', 16, 800, 0),
('thomas.alpert@gmail.com', 'thomas.alpert@gmail.com', '$2b$10$P1mUOZ1ntcWRuTO6CkjOxeQQEDpYLvv2XjchUMA9mxF4cFovMq.hm', 18, 800, 0),
('Kev', 'hacker@hacker.com', '$2b$10$9v/frBbpcqLrUgnPEO1px.W991av/0EUqE7prv0X2hQ0XCv1Cp7ly', 19, 800, 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `botgames`
--
ALTER TABLE `botgames`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `botgames`
--
ALTER TABLE `botgames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `library`
--
ALTER TABLE `library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;
