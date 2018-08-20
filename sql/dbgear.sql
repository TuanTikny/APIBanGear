-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2018 at 02:22 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbgear`
--

-- --------------------------------------------------------

--
-- Table structure for table `oders`
--

CREATE TABLE `oders` (
  `id` int(11) NOT NULL,
  `jsonproducts` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `jsonuser` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `totalprice` decimal(10,0) NOT NULL,
  `date` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `oders`
--

INSERT INTO `oders` (`id`, `jsonproducts`, `jsonuser`, `totalprice`, `date`, `status`) VALUES
(2, '[{\"id\":6,\"name\":\"Chuột Dare-U S100 RGB\",\"quantity\":26,\"price\":690000,\"image\":\"http://product.hstatic.net/1000026716/product/gearvn-dare-u-s100-rgb-3.png\",\"description\":\"Sensor: PMW3310\\r\\nDPI: 400-800-1000-2000\\r\\nTracking: 130IPS\\r\\nPolling rate: 1000Hz\\r\\nSwitch: OMRON (10 triệu lần click)\\r\\nKích thước: 132.5*74*41.5mm\"}]', '{\"id\":11,\"email\":\"kimloan\",\"name\":\"Nguyễn Thị Kim Loan\",\"birthday\":\"2018-05-05T17:00:00.000Z\",\"phone\":\"016226549\"}', '60000', '2018-08-14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `quantity`, `price`, `image`, `description`) VALUES
(2, 'Thermaltake Floe Riing RGB 280 TT Premium Edition', 56, '4390000', 'http://product.hstatic.net/1000026716/product/floe_riing_rgb_240_tt_d25b8926abdd4e15a55283ee20f997ce.jpg', 'Hỗ trợ CPU socket\r\nIntel® LGA 20xx/115x/1366/775\r\nAMD® AM4/AM3+/AM3/AM2+/AM2/FM2+/FM2/FM1/TR4\r\n\r\nĐế tản nhiệt\r\n\r\nĐế đồng nguyên khối\r\nSố lượng quạt\r\n2 quạt 9 cánh\r\n\r\nTốc độ quạt\r\n500-1400RPM ± 10%'),
(3, 'Case Sama Phagaron - Mid Tower', 29, '1190000', 'http://product.hstatic.net/1000026716/product/case_sama_phragon_gearvn.jpg', 'Thùng case tích hợp led RGB'),
(4, 'XIGMATEK GALAXY PREMIUM 3 - RGB', 32, '600000', 'http://product.hstatic.net/1000026716/product/xigmatek_galaxy_premium_3_-_rgb_gearvn.jpg', '\r\nThông tin sản phẩm\r\n\r\nBảo hành: 12 THÁNG\r\nHãng sản xuất: Xigmatek'),
(5, 'Logitech G102 Prodigy RGB', 31, '400000', 'http://product.hstatic.net/1000026716/product/g1025.jpg', 'Mẫu chuột vừa mới được Logitech giới thiệu ra thị trường Việt Nam, mang tên Logitech G102 , với giá bán chỉ 590.000đ nhưng lại mang trong mình những tính năng chỉ thường xuất hiện trên những mẫu chuột cao cấp.\r\n» Với kiểu thiết kế huyền thoại, G102 đảm bảo việc phù hợp với nhiều kiểu cầm chuột, cũng như tạo sự thoải mái khi sử dụng lâu dài.\r\n» Dải led phía đuôi cùng logo có thể đổi 16.8tr màu.\r\n» Tất cả các nút phụ đều có thể tùy chỉnh và lưu profile lên chuột bằng phần mềm.'),
(6, 'Chuột Dare-U S100 RGB', 26, '690000', 'http://product.hstatic.net/1000026716/product/gearvn-dare-u-s100-rgb-3.png', 'Sensor: PMW3310\r\nDPI: 400-800-1000-2000\r\nTracking: 130IPS\r\nPolling rate: 1000Hz\r\nSwitch: OMRON (10 triệu lần click)\r\nKích thước: 132.5*74*41.5mm'),
(7, 'Razer Abyssus Essential', 24, '990000', 'http://product.hstatic.net/1000026716/product/gearvn-razer-abyssus-essential-rgb-2.jpg', 'Nhà Sản Xuất : Razer\r\nTình Trạng : Mới 100% - Fullbox\r\nBảo Hành : 24 tháng ( 1 đổi 1 )'),
(8, 'Logitech G402 Hyperion', 68, '900000', 'http://hstatic.net/716/1000026716/1/2016/5-19/ecf745460ac14c2da5ec6869918c0a95.png', 'Logitech G402 - Chuột chơi game dành riêng cho fan FPS.\r\n\r\nChú chuột chơi game Logitech G402 sở hữu tốc độ quét lên tới 500 IPS, sử dụng công nghệ cảm biến mới nhất của Logitech là Fusion Engine cho độ chính xác cực cao khi sử dụng.\r\n\r\nLogitech đã từng làm giới game thủ bất ngờ với sản phẩm chuột chơi game G502 Proteus Core với độ phân giải lên tới 12.000 DPI, và đây đã được coi là kỷ lục. Và hiện giờ, một sản phẩm khác của hãng là G402 Hyperion Fury FPS (chuyên biệt dành cho game thủ FPS) cũng đang kéo dài thêm lựa chọn chuột chơi game cao cấp dành cho người dùng chuyên nghiệp.'),
(9, 'SteelSeries Rival 310', 45, '1390000', 'http://product.hstatic.net/1000026716/product/gearvn-steelseries-rival-310-1.png', 'Nhà Sản Xuất : Steelseries\r\nTình Trạng : Mới 100% - Fullbox\r\nBảo Hành : 12 tháng ( 1 đổi 1 )\r\nLed : 16.8 triệu màu '),
(10, 'Asus ROG Gladius II', 36, '1900000', 'http://product.hstatic.net/1000026716/product/gearvn-asus-rog-gladius-ii-3.jpg', 'Nhà Sản Xuất: ASUS\r\nTình Trạng : Mới 100% - Fullbox\r\nBảo Hành : 12 Tháng'),
(11, 'Corsair K63 Wireless', 65, '2900000', 'http://product.hstatic.net/1000026716/product/gearvn-corsair-k63_wireless_4.png', 'Nhà sản xuất : Corsair\r\nTình trạng : Fullbox – 100%\r\nBảo hành : 24 tháng ( 1 đổi 1 )\r\nLED : BLUE\r\nKết Nối: Không dây qua Bluetooth Hoặc USB Receiver'),
(12, 'Corsair Gaming K70 LUX RGB', 14, '4050000', 'http://sw001.hstatic.net/6/02002d58b42501/a.png', '+PC với 2 cổng USB 2.0\r\n+Windows 10, Windows 8, Windows 7, hoặc Windows Vista\r\n+Yêu cầu kết nối Internet để download Driver\r\n+Vẫn với thiết kế cũ được bao bọc hoàn toàn bằng vỏ nhôm nhưng theo thông tin về hãng thì 3 sản phẩm này sẽ được tối ưu hóa về độ sáng, cụ thể sáng hơn những sản phẩm trước, mang đến cho cộng đồng game thủ những trải nghiệm mới nhất về LED cũng như là LED RGB.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `roles` int(11) NOT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `roles`, `birthday`, `phone`) VALUES
(11, 'kimloan', '202cb962ac59075b964b07152d234b70', 'Nguyễn Thị Kim Loan', 0, '2018-05-06', '016226549'),
(12, 'buianhtuan', '202cb962ac59075b964b07152d234b70', 'Bùi Tuấn', 0, '1994-09-02', '01699209872');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `oders`
--
ALTER TABLE `oders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
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
-- AUTO_INCREMENT for table `oders`
--
ALTER TABLE `oders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
