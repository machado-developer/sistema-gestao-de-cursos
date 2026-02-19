-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: 82.29.184.231    Database: nt_nextech_db
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0ab1be70-e6c1-4845-b30b-e9d1fabff533','e97edbf58646589c591f8124765c3ccb5361afaf8be23271119ac484f70f5ccd','2026-01-30 10:44:34.574','20260127222633_empresa_cliente',NULL,NULL,'2026-01-30 10:44:33.971',1),('158a7f12-b7bb-4e30-9f07-74ca3dd5e775','e5882f695417dd07c49209a394628361f4bb3468ffc045ca8ae4e3d2dd59fd3a','2026-01-30 10:44:31.372','20260122152011_add_dept_cargo_optional',NULL,NULL,'2026-01-30 10:44:30.773',1),('1ebc3a05-128a-4630-9ef4-8e6a843aa653','067530a4415738fdfd7b0e5330ef559f5c3a8b5428b663899eb463a8568317d1','2026-01-30 10:44:33.105','20260126160658_nn',NULL,NULL,'2026-01-30 10:44:32.200',1),('354ccad8-7ffe-45e8-be69-73963cb7b82c','308db7e25c147f2feddb838bfbf5287673eef619c7ec679b68c77c57ab4535fe','2026-02-19 12:02:07.150','20260209085541_add_access_control',NULL,NULL,'2026-02-19 12:02:02.363',1),('36ac81a5-9d9b-4b64-ac92-1eb83416acdf','61beffca30443ef29c99bf6605e57aab2b748269abd7432d81d4621cbc72bc98','2026-02-19 12:01:40.257','20260202131834_oooo','',NULL,'2026-02-19 12:01:40.257',0),('54cbbceb-ad9e-4331-8bc5-c93e1ad42f7a','f294bbdf20823fe2104bbee0e41bb3762044391c2080ffee0301fc1c98ae6714','2026-01-30 10:44:29.803','20260109162250_add_academic_module',NULL,NULL,'2026-01-30 10:44:28.973',1),('5c296651-b05b-47af-8a99-518d20e46b7b','6b023761b0bfebc3e05ceb4c307826b47dc5e2fe556b6f26b63b8eb1732c3dba','2026-01-30 10:44:32.047','20260123103111_iniii',NULL,NULL,'2026-01-30 10:44:31.527',1),('641038b6-cfda-454e-9dd4-4d25848a540c','e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',NULL,'20260212_seed_module_items','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260212_seed_module_items\n\nDatabase error code: 1065\n\nDatabase error:\nQuery was empty\n\nPlease check the query number 1 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20260212_seed_module_items\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20260212_seed_module_items\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:226',NULL,'2026-02-19 12:02:11.143',0),('6806050d-4dfd-4af8-937e-0fe9ee60b3cb','83cf74447ff832092ff10bd6b8cfb61e01b1df9f3287506e3d3723020b994de6','2026-01-30 10:44:27.995','20260107204546_init',NULL,NULL,'2026-01-30 10:44:27.021',1),('6c8e2315-4ded-497f-a5f4-b21ecc8cdb11','61beffca30443ef29c99bf6605e57aab2b748269abd7432d81d4621cbc72bc98',NULL,'20260202131834_oooo','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260202131834_oooo\n\nDatabase error code: 1050\n\nDatabase error:\nTable \'rh_descontos\' already exists\n\nPlease check the query number 1 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20260202131834_oooo\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20260202131834_oooo\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:226','2026-02-19 12:01:39.964','2026-02-19 11:53:50.636',0),('7d9e37f1-e71c-4968-bf1e-1a7e471176d3','43ed6935b58f5ce60c7ec3b3c76f02bb08edb2a5db33a7f7cc55eeda683f5a4f','2026-01-30 10:44:28.818','20260107223737_secony',NULL,NULL,'2026-01-30 10:44:28.294',1),('7ddf27e2-6b41-4494-8807-6df2a3e28de6','9fd8223da74a16fbb7668d9c87d0249d26b58290f44ceecee44a50d3314c6075','2026-01-30 10:45:00.799','20260130104459_carg',NULL,NULL,'2026-01-30 10:45:00.259',1),('855230af-02e2-427a-9d11-8060b6cee036','bb7c0a7983113bb4ba1b1faa3f73845800589def4a418cc73ee100214d04f7a1','2026-02-19 12:02:10.822','20260209105823_granular_permissions',NULL,NULL,'2026-02-19 12:02:09.812',1),('a0a8893b-beac-48a7-bd8c-30365f4d99c2','a876de41f8d812ff365b79329b7b2a59e41afe8206a8fc105bf343c2c3911d7d','2026-02-19 12:02:09.626','20260209103650_scaling_email_jobs',NULL,NULL,'2026-02-19 12:02:08.931',1),('a7d08ce5-e7a0-4041-bc07-5b952b02d69c','ca229876683db903eef3d7ef62e067ec3ef29243ccb6e826eddb8241fdceb0ca',NULL,'20260130145039_add_adiantamento_salario',NULL,'2026-02-19 11:53:35.200','2026-01-30 14:50:41.249',0),('e18f26e1-d96f-4549-8c14-097c5fbd30ae','cf1d3e39ad972480615edcbb22fc3a718dfb730bfcda9add6489934facafceb3','2026-01-30 10:44:30.622','20260122135353_init_rh',NULL,NULL,'2026-01-30 10:44:29.953',1),('e9f13537-4d51-4fad-98cd-9cb0bcfef993','ca229876683db903eef3d7ef62e067ec3ef29243ccb6e826eddb8241fdceb0ca','2026-02-19 11:53:35.793','20260130145039_add_adiantamento_salario','',NULL,'2026-02-19 11:53:35.793',0),('ecc1c58d-3ec2-44b7-a29a-d9478d0d5958','e94583bfd08a3e3b1294f52ce93de1b98d422dc711a2ae6789fdb8fdd7d787b5','2026-02-19 12:02:08.730','20260209101029_add_email_jobs',NULL,NULL,'2026-02-19 12:02:08.178',1),('f8b659ec-c6db-4951-a6b9-ba91baebe14f','838921014a9d468e7cb257fe39db48250df7a5e53a6d48483d27f25d3ae729b9','2026-01-30 10:44:33.819','20260127183217_auth',NULL,NULL,'2026-01-30 10:44:33.254',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_completo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bi_documento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_nascimento` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `escolaAcademica` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `escolaridade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Endereco` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bolseiro` tinyint(1) NOT NULL DEFAULT '0',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresaId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alunos_bi_documento_key` (`bi_documento`),
  UNIQUE KEY `alunos_email_key` (`email`),
  KEY `alunos_userId_fkey` (`userId`),
  KEY `alunos_empresaId_fkey` (`empresaId`),
  CONSTRAINT `alunos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas_clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `alunos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES ('781d501a-cafa-4b6b-b3ac-bdd56df6fa53','Antonio Machado ','0065ADBB0F005','d6ev.antoniomachado@gmail.com','2026-02-03 00:00:00.000','2026-02-02 14:52:59.869','2026-02-02 14:52:59.869','948757047','Masculino','','12ª Classe','Hotel de convenções de Talatona -HCTA,Talatona CCB4,GU02,Luanda',0,'bd549ef1-2193-448e-9556-741318df44cf','537a3afb-7a03-42cb-8e56-ac3c295ca9c2');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entidade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detalhes` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES ('017e9d59-1412-4e4f-a581-b0e0a4a14a18',NULL,'info@newtech-angola.com','UPSERT_PRESENCAHR','PresencaHR','{\"args\":{\"where\":{\"funcionarioId_data\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"data\":\"2026-02-02T00:00:00.000Z\"}},\"update\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"FALTA_I\",\"horas_extras_50\":0,\"horas_extras_100\":0},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"FALTA_I\",\"horas_extras_50\":0,\"horas_extras_100\":0}}}','2026-02-02 15:17:42.539'),('01e1ba4a-8edb-4fef-ac50-b89865c07fa4',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Laura Albertina\",\"bi_documento\":\"008315370LA042\",\"email\":\"laura.cruz@newtech-angola.com\",\"telefone\":\"924860942\",\"nif\":\"008315370LA042\",\"iban\":\"AO060040 0000 3629426710112\",\"numero_inss\":\"xxxxxxxxxxx\",\"genero\":\"F\",\"data_nascimento\":\"2005-05-01T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"35ce4367-aa1f-411e-ba07-86068f7f68b3\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-22T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 11:46:49.300'),('03af5867-649f-423d-bc53-d5597d223bcd',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026,\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:37:49.510'),('04528ee4-41a0-4a91-823d-f000894ec7d8',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:12.906'),('0525877e-77ea-4f10-9b50-423bae8ce48f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026,\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:43:34.457'),('06928fa4-f0d4-4668-90a3-6c5f45fe5e6d',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\"},\"data\":{\"nome\":\"António Ulundo Machado\",\"bi_documento\":\"008469764LA047\",\"email\":\"antonio.machado@newtech-angola.com\",\"telefone\":\"948575047\",\"nif\":null,\"iban\":\"AO06 004000006973232610190\",\"numero_inss\":\"xxxxxxx3\",\"genero\":\"M\",\"data_nascimento\":\"2002-10-28T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"3bb50e11-7805-42be-9bd7-a16a2b8852e9\"}},\"departamento\":{\"connect\":{\"id\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\"}},\"data_admissao\":\"2026-01-30T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:34:23.053'),('083dcc7d-3572-4952-8d77-1ea20c1caa97',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:28.940'),('0b03d92a-f52b-4a33-bd30-08bfc87935e9',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\"},\"data\":{\"nome\":\"Bianca Mendes Mota\",\"bi_documento\":\"006151638LA049\",\"email\":\"bianca.mendes@newtech-angola.com\",\"telefone\":\"944240545\",\"nif\":null,\"iban\":\"A06 005100003233879310123\",\"numero_inss\":\"xxxxx1\",\"genero\":\"F\",\"data_nascimento\":\"2002-10-09T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"b957f4c3-6e7e-4490-80a8-834062a613da\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2025-08-07T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:36:17.448'),('0b2ed86c-4e96-4690-86bc-763c0c96016f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":6,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:12.403'),('0ca4c9ec-24ac-4237-a5d1-095b88f5ff22',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\"},\"data\":{\"nome\":\"Bianca Mendes Mota\",\"bi_documento\":\"006151638LA049\",\"email\":\"bianca.mendes@newtech-angola.com\",\"telefone\":\"944240545\",\"nif\":null,\"iban\":\"A06 005100003233879310123\",\"numero_inss\":\"xxxxx1\",\"genero\":\"F\",\"data_nascimento\":\"2002-10-09T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"b957f4c3-6e7e-4490-80a8-834062a613da\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2025-08-07T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:49:45.196'),('0f624c5d-5356-4342-a8f6-9e0b706e74b6',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:55:01.373'),('10bef1ad-5ff0-42d3-8cb7-19fa7a255aa0',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:29.751'),('10ef8042-7330-494c-872f-cb64e73ca97f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:14.121'),('1152b8bc-2f80-423e-8641-ffe3cd6b90b4',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"194fff4e-16a3-4558-a10a-02e51887e26d\"},\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 13:49:08.648'),('122fa428-7fa3-49e2-b4af-bfe73650d67d',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:11.961'),('13171731-6bbc-48f3-a480-41f6912d33a2',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\"},\"data\":{\"nome\":\"Cláudio Júlio Lisboa\",\"bi_documento\":\"008171687LA042\",\"email\":\"claudio.lisboa@newtech-angola.com\",\"telefone\":null,\"nif\":null,\"iban\":\"AO06 0051.0000.7275.7053.1018.6\",\"numero_inss\":\"xxxxx3\",\"genero\":\"F\",\"data_nascimento\":\"2002-12-06T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"c5510455-b4cf-41d4-b41a-3e078cfaee36\"}},\"departamento\":{\"connect\":{\"id\":\"3f357acb-6170-4436-8cb0-42741149daf5\"}},\"data_admissao\":\"2019-01-30T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:35:00.370'),('13943e3d-5122-4d50-9145-400516f78f60',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":4,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:03.182'),('15bf420b-876e-4961-ab66-bddf96b68eee',NULL,'info@newtech-angola.com','CREATE_DOCUMENTO','Documento','{\"args\":{\"data\":{\"funcionarioId\":\"0d487910-65a5-4526-aa6d-080022cd426f\",\"tipo\":\"Foto\",\"nome\":\"99.png\",\"url\":\"/uploads/rh/funcionarios/0d487910-65a5-4526-aa6d-080022cd426f/1770045027719-foto.webp\"}}}','2026-02-02 15:10:29.470'),('175315f2-985e-4b6e-b171-f1bec1a7cacf',NULL,'info@newtech-angola.com','UPDATE_DEPARTAMENTO','Departamento','{\"args\":{\"where\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"},\"data\":{\"nome\":\"Comercial e Gestão de Projectos\",\"descricao\":\"\"}}}','2026-01-30 11:31:17.143'),('179aedc6-ae80-48dd-b21a-f96bdeeba330',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"842e2b9f-b458-4c27-abbb-44ddadb498ff\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":2454750,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 14:10:56.713'),('180be287-8dae-47c3-8ecc-4be059ba88cc',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:22:59.355'),('195a8e59-b452-41e2-810d-103ac4ba3552',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\"},\"data\":{\"nome\":\"António Ulundo Machado\",\"bi_documento\":\"008469764LA047\",\"email\":\"antonio.machado@newtech-angola.com\",\"telefone\":\"948575047\",\"nif\":null,\"iban\":\"AO06 004000006973232610190\",\"numero_inss\":\"xxxxxxx3\",\"genero\":\"M\",\"data_nascimento\":\"2002-10-28T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"3bb50e11-7805-42be-9bd7-a16a2b8852e9\"}},\"departamento\":{\"connect\":{\"id\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\"}},\"data_admissao\":\"2026-01-30T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:47:37.833'),('1c99aecc-b4ad-450c-8282-3fafee485584',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:28.120'),('1ca0a1a9-9e33-4d74-8358-70f935d90876',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:55:00.559'),('1d3a1b17-6035-41df-a991-baaf69145299',NULL,'info@newtech-angola.com','CREATE_USER','User','{\"args\":{\"data\":{\"name\":\"Euclides Agapito\",\"email\":\"euclides.agapito@newtech-angola.com\",\"password\":\"[REDACTED]\",\"role\":\"ADMIN\"},\"select\":{\"id\":true,\"name\":true,\"email\":true,\"role\":true}}}','2026-02-02 14:04:34.817'),('1d580ed7-50a2-45e7-baca-c93ab0cb3397',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:22:58.147'),('1f4f4b03-72fa-49b9-9f2d-6820f3c47f3f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":4,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:03.993'),('202a0f36-c3f5-4a26-8bab-76c32ff53b1d',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"b99a9189-68e2-4de9-a786-b633d69201b0\"},\"data\":{\"nome\":\"Laura Albertina\",\"bi_documento\":\"008315370LA042\",\"email\":\"laura.cruz@newtech-angola.com\",\"telefone\":\"924860942\",\"nif\":\"008315370LA042\",\"iban\":\"AO060040 0000 3629426710112\",\"numero_inss\":\"xxxxxxxxxxx\",\"genero\":\"F\",\"data_nascimento\":\"2005-05-01T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"35ce4367-aa1f-411e-ba07-86068f7f68b3\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-22T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:37:26.981'),('21265183-03f5-4557-b7b3-2ec721a50ae3',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:12.365'),('2322a5d9-7f55-4c17-b8ef-20de63f138ae',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"fffffbc5-8f04-4858-be77-644af738ade5\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":113402.06,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:49:45.835'),('24bbf0b9-6d51-4141-a2b4-35c694fbfd29',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:13.017'),('25231b9f-7228-4838-9abe-48b4ae2b084b',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:13.716'),('2b2cf1f1-ca85-4bd1-8517-5b548071ea9d',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":6,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:11.593'),('2e804fa6-8e2f-4182-9720-19a7b68e5de8',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:24.924'),('2f2e8ff0-9f3a-495d-aecc-b4e45609ca27',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":5,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:15.739'),('331d3756-eb7c-40a8-aef2-d0913740fec2',NULL,'info@newtech-angola.com','UPDATE_DEPARTAMENTO','Departamento','{\"args\":{\"where\":{\"id\":\"3f357acb-6170-4436-8cb0-42741149daf5\"},\"data\":{\"nome\":\"Telecom\",\"descricao\":\"\"}}}','2026-01-30 11:31:47.717'),('333885b3-d2ae-4353-bf8d-78aeaa455460',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Cláudio Júlio Lisboa\",\"bi_documento\":\"008171687LA042\",\"email\":\"claudio.lisboa@newtech-angola.com\",\"telefone\":null,\"nif\":null,\"iban\":\"AO06 0051.0000.7275.7053.1018.6\",\"numero_inss\":\"xxxxx3\",\"genero\":\"F\",\"data_nascimento\":\"2002-12-06T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"c5510455-b4cf-41d4-b41a-3e078cfaee36\"}},\"departamento\":{\"connect\":{\"id\":\"3f357acb-6170-4436-8cb0-42741149daf5\"}},\"data_admissao\":\"2019-01-30T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:22:26.354'),('33680d86-71cc-4613-b1ae-03ac5bdfa231',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Director Técnico\",\"departamentoId\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\",\"salario_base\":180000}}}','2026-01-30 11:33:59.467'),('33b17440-fe9c-4d5e-9ecc-854f1f491e16',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"194fff4e-16a3-4558-a10a-02e51887e26d\"},\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 14:07:51.394'),('35cb102f-a779-4aad-ad22-f51d2aea3e88',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026,\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:54:59.343'),('3630ed64-c87b-4e5f-a2c6-16d0c4d2426a',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:22:58.547'),('3b8aba98-16d7-4988-a942-437f36891872',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"842e2b9f-b458-4c27-abbb-44ddadb498ff\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":231301,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 13:49:09.294'),('3c1c6c44-e24e-469c-afc8-36e9a0f49771',NULL,'info@newtech-angola.com','POST CRIAR','ALUNO','{\"url\":\"/api/alunos\",\"method\":\"POST\"}','2026-02-02 14:53:00.992'),('3dd13589-1655-4672-8690-66185e0ad82c',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2024,\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:38.267'),('3eb76038-b68b-4797-b152-35d18fca9c0c',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":2,\"ano\":2026,\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:27.715'),('3f959dc3-0573-441e-bf6d-f4743c4d34f2',NULL,'info@newtech-angola.com','CREATE_DEPARTAMENTO','Departamento','{\"args\":{\"data\":{\"nome\":\"Telecon\",\"descricao\":\"\"}}}','2026-01-30 11:31:39.017'),('3fd3e1f7-45fe-411a-833d-ae174121305f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:22:57.744'),('429593af-544f-42d6-a91c-727417529402',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2024,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:45.575'),('436d0e7f-9b82-42de-80b5-01bbf826b7e5',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":6,\"ano\":2026,\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:10.296'),('4594570d-0d11-4b92-990d-1f0e82e3ddb1',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\"},\"data\":{\"nome\":\"Cláudio Júlio Lisboa\",\"bi_documento\":\"008171687LA042\",\"email\":\"claudio.lisboa@newtech-angola.com\",\"telefone\":null,\"nif\":null,\"iban\":\"AO06 0051.0000.7275.7053.1018.6\",\"numero_inss\":\"xxxxx3\",\"genero\":\"F\",\"data_nascimento\":\"2002-12-06T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"c5510455-b4cf-41d4-b41a-3e078cfaee36\"}},\"departamento\":{\"connect\":{\"id\":\"3f357acb-6170-4436-8cb0-42741149daf5\"}},\"data_admissao\":\"2019-01-30T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:48:44.714'),('45d099a2-9cc7-4861-9fe1-6a0277ee5c37',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":2,\"ano\":2026,\"salario_base\":231301,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":231301,\"inss_trabalhador\":6939.03,\"inss_empresa\":18504.08,\"base_irt\":224361.97,\"irt_devido\":35635.15,\"liquido_receber\":188726.82,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:22.901'),('45d352f2-d995-4313-b796-8f0315ef1e64',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":5,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:14.356'),('45e49654-0ca8-4676-ab68-5043577fd7be',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"eadb88a4-8df2-4d4e-8173-f67a4797e755\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":123600,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:35:01.013'),('4f6e69d9-0313-4ae6-85a6-e3c999e8679b',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":51505,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51505,\"inss_trabalhador\":1545.15,\"inss_empresa\":4120.4,\"base_irt\":49959.85,\"irt_devido\":0,\"liquido_receber\":49959.85,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":2,\"ano\":2026,\"salario_base\":51505,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51505,\"inss_trabalhador\":1545.15,\"inss_empresa\":4120.4,\"base_irt\":49959.85,\"irt_devido\":0,\"liquido_receber\":49959.85,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:43:36.663'),('512ab63b-0d39-407c-a3f1-a35e6b55516c',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"b99a9189-68e2-4de9-a786-b633d69201b0\"},\"data\":{\"nome\":\"Laura Albertina\",\"bi_documento\":\"008315370LA042\",\"email\":\"laura.cruz@newtech-angola.com\",\"telefone\":\"924860942\",\"nif\":\"008315370LA042\",\"iban\":\"AO060040 0000 3629426710112\",\"numero_inss\":\"xxxxxxxxxxx\",\"genero\":\"F\",\"data_nascimento\":\"2005-05-01T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"35ce4367-aa1f-411e-ba07-86068f7f68b3\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-22T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:43:18.320'),('531882e8-50df-41d2-9dad-9869b54ac55c',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"fffffbc5-8f04-4858-be77-644af738ade5\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":123300,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:36:18.093'),('5390e1a3-76a9-48f7-97c2-e84768c23e69',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51500,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51500,\"inss_trabalhador\":1545,\"inss_empresa\":4120,\"base_irt\":49955,\"irt_devido\":0,\"liquido_receber\":49955,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026,\"salario_base\":51500,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51500,\"inss_trabalhador\":1545,\"inss_empresa\":4120,\"base_irt\":49955,\"irt_devido\":0,\"liquido_receber\":49955,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:37:50.720'),('554ac9ba-3783-4caa-8971-56d1ede901b9',NULL,'info@newtech-angola.com','CREATE_CONTRATO','Contrato','{\"args\":{\"data\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"tipo\":\"ESTAGIO\",\"data_inicio\":\"2026-01-12T00:00:00.000Z\",\"data_fim\":\"2026-02-12T00:00:00.000Z\",\"renovacao_automatica\":false,\"status\":\"VIGENTE\",\"salario_base\":50000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:16:44.334'),('56792bc6-519e-4c0b-9177-3ad84e7f4579',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Director Técnico (CTO)\",\"departamentoId\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\",\"salario_base\":200000}}}','2026-01-30 13:30:26.218'),('57d12d2d-287f-4522-991a-bf06f9910843',NULL,'info@newtech-angola.com','UPLOAD_DOCUMENTO','FUNCIONARIO','{\"funcionarioId\":\"0d487910-65a5-4526-aa6d-080022cd426f\",\"tipo\":\"Foto\",\"nome\":\"99.png\"}','2026-02-02 15:10:30.312'),('58f9c359-29e4-40a9-9d9a-5ccaf45560f5',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":4,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:04.805'),('594329af-8bbc-42f3-aec6-beb2bf274c3a',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026,\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:43:35.669'),('5ab5827e-fb51-45b2-a827-6f64148a7609',NULL,'info@newtech-angola.com','CREATE_CONTRATO','Contrato','{\"args\":{\"data\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"tipo\":\"INDETERMINADO\",\"data_inicio\":\"2025-08-07T00:00:00.000Z\",\"data_fim\":null,\"renovacao_automatica\":false,\"status\":\"VIGENTE\",\"salario_base\":110000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 11:56:20.746'),('5bbfb8bb-23b0-4db8-8cad-3d3cbe2bb346',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 13:44:25.181'),('5c84383d-7bba-4d13-b770-36aad18d8f01',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"842e2b9f-b458-4c27-abbb-44ddadb498ff\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":231301,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 13:54:50.279'),('5ef2330d-904c-4ea5-9774-9699637bc505',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2024,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:39.680'),('63b1bb1a-037c-48df-a432-e9ad5a2ef06b',NULL,'info@newtech-angola.com','UPSERT_PRESENCAHR','PresencaHR','{\"args\":{\"where\":{\"funcionarioId_data\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"data\":\"2026-02-02T00:00:00.000Z\"}},\"update\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"PRESENTE\",\"entrada\":\"2026-02-02T08:00:00.000Z\",\"saida\":\"2026-02-02T04:06:00.000Z\",\"horas_extras_50\":0,\"horas_extras_100\":20.1},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"PRESENTE\",\"entrada\":\"2026-02-02T08:00:00.000Z\",\"saida\":\"2026-02-02T04:06:00.000Z\",\"horas_extras_50\":0,\"horas_extras_100\":20.1}}}','2026-02-02 15:17:42.200'),('64f1c7cb-f155-4b8e-bad3-faadff581b15',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":3,\"ano\":2024}},\"update\":{\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":3,\"ano\":2024,\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:47:59.415'),('6665bd87-7c2c-404f-8a43-dd82f0b324b6',NULL,'info@newtech-angola.com','UPLOAD_DOCUMENTO','FUNCIONARIO','{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"tipo\":\"Foto\",\"nome\":\"IMG-20251123-WA0015.jpg\"}','2026-01-30 12:26:21.607'),('67004265-6f23-481e-a866-f0f306ae7495',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Nelma Dias Bragança\",\"bi_documento\":\"009552848LA046\",\"email\":\"nelma.dias@newtech-angola.com\",\"telefone\":\"925879945\",\"nif\":null,\"iban\":\"AO06 004400002441064914162\",\"numero_inss\":\"xxxxxxxx3\",\"genero\":\"F\",\"data_nascimento\":\"2001-02-27T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"f06c632a-8591-4ee3-9bc6-c33f9ad708e7\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-12T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:16:44.010'),('69bec035-8aa3-4d1c-8f85-0def649a36fc',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026,\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:37:50.316'),('69dd2d85-b6d6-4c65-af5a-f3de659470bd',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:55:00.155'),('6c512d80-ffe1-4b61-ba62-205261d29ebf',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:23.708'),('6ceccf07-d854-42fa-a2dc-e459a2670ecf',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":218770,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":10000,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":218770,\"inss_trabalhador\":6563.1,\"inss_empresa\":17501.6,\"base_irt\":212206.9,\"irt_devido\":33447.24,\"liquido_receber\":188759.66,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026,\"salario_base\":218770,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":10000,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":218770,\"inss_trabalhador\":6563.1,\"inss_empresa\":17501.6,\"base_irt\":212206.9,\"irt_devido\":33447.24,\"liquido_receber\":188759.66,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:12.502'),('6e81ddc3-cdcd-4bc8-b75b-17bf5f6be0e9',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2024,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:42.577'),('6fd32f8e-d256-455b-b195-c239134dd1d2',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\"},\"data\":{\"nome\":\"António Ulundo Machado\",\"bi_documento\":\"008469764LA047\",\"email\":\"antonio.machado@newtech-angola.com\",\"telefone\":\"948575047\",\"nif\":null,\"iban\":\"AO06 004000006973232610190\",\"numero_inss\":\"xxxxxxx3\",\"genero\":\"M\",\"data_nascimento\":\"2002-10-28T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"3bb50e11-7805-42be-9bd7-a16a2b8852e9\"}},\"departamento\":{\"connect\":{\"id\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\"}},\"data_admissao\":\"2026-01-30T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:26:17.480'),('704fad60-8fc0-415e-9a65-45570b51abcd',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":3,\"ano\":2024}},\"update\":{\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":3,\"ano\":2024,\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:47:59.013'),('72c5ff95-bd19-4a7c-b48c-822c612feb9a',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:22:58.951'),('74840dc4-8a74-44bc-a821-b317637bee04',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026,\"salario_base\":123600,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123600,\"inss_trabalhador\":3708,\"inss_empresa\":9888,\"base_irt\":119892,\"irt_devido\":0,\"liquido_receber\":119892,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:43:34.861'),('76b93af9-9c79-4d81-b44c-e71b0350d43a',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:54:59.749'),('7809d76f-896a-4c4c-be87-1076c3f06f31',NULL,'info@newtech-angola.com','CREATE_EMPRESA','Empresa','{\"args\":{\"data\":{\"nome\":\"SGRH ANGOLA - ERP\",\"cidade\":\"Luanda\",\"pais\":\"Angola\",\"email\":\"RH@SGRH.CO.AO\"}}}','2026-01-30 11:21:10.680'),('7b325e47-8d8f-4362-ad42-057a4c9fbdad',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":5,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:13.312'),('7eb9fecf-e05d-44bb-99bc-64052e1a7c18',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":2,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:23.305'),('823a4ae7-e6d8-4f15-8024-bd9330a9e95e',NULL,'info@newtech-angola.com','CREATE_DEPARTAMENTO','Departamento','{\"args\":{\"data\":{\"nome\":\"Direção\",\"descricao\":\"\"}}}','2026-01-30 11:33:30.310'),('82775669-07dc-4d89-9ce5-8ff3dbb6f7ac',NULL,'info@newtech-angola.com','CREATE_EMPRESACLIENTE','EmpresaCliente','{\"args\":{\"data\":{\"nome\":\"Newtech\",\"nif\":\"565656565656\",\"email\":\"dev.antoniomachado@gmail.com\",\"telefone\":\"+244948757047\",\"endereco\":\"Hotel de convenções de Talatona -HCTA,Talatona CCB4,GU02,Luanda\",\"responsavel\":\"\"}}}','2026-02-02 14:41:13.891'),('844f6efa-aea3-4810-9d7e-db6660f0b26b',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"b99a9189-68e2-4de9-a786-b633d69201b0\"},\"data\":{\"nome\":\"Laura Albertina\",\"bi_documento\":\"008315370LA042\",\"email\":\"laura.cruz@newtech-angola.com\",\"telefone\":\"924860942\",\"nif\":\"008315370LA042\",\"iban\":\"AO060040 0000 3629426710112\",\"numero_inss\":\"xxxxxxxxxxx\",\"genero\":\"F\",\"data_nascimento\":\"2005-05-01T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"35ce4367-aa1f-411e-ba07-86068f7f68b3\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-22T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:50:29.444'),('8572ea1c-cb94-42ad-92bd-b114951fc42d',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:13.311'),('859a02a9-ee8c-49ab-a2f8-630de6795dd8',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"António Ulundo Machado\",\"bi_documento\":\"008469764LA047\",\"email\":\"antonio.machado@newtech-angola.com\",\"telefone\":\"948575047\",\"nif\":null,\"iban\":\"AO06 004000006973232610190\",\"numero_inss\":\"xxxxxxx3\",\"genero\":\"M\",\"data_nascimento\":\"2002-10-28T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"3bb50e11-7805-42be-9bd7-a16a2b8852e9\"}},\"departamento\":{\"connect\":{\"id\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\"}},\"data_admissao\":\"2026-01-30T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:25:09.805'),('865ba230-c8a4-41a0-a037-3d27fc27aeaf',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":3,\"ano\":2024}},\"update\":{\"salario_base\":51505,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51505,\"inss_trabalhador\":1545.15,\"inss_empresa\":4120.4,\"base_irt\":49959.85,\"irt_devido\":0,\"liquido_receber\":49959.85,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":3,\"ano\":2024,\"salario_base\":51505,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51505,\"inss_trabalhador\":1545.15,\"inss_empresa\":4120.4,\"base_irt\":49959.85,\"irt_devido\":0,\"liquido_receber\":49959.85,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:48:00.621'),('8b387922-b43d-4d70-b84f-d22c087bc356',NULL,'info@newtech-angola.com','DELETE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"0d487910-65a5-4526-aa6d-080022cd426f\"}}}','2026-02-02 15:11:40.253'),('8b7074fe-b400-40cf-b850-4a0b95fc09eb',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"194fff4e-16a3-4558-a10a-02e51887e26d\"},\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 14:12:52.178'),('94f70cee-dbfa-4f57-a23c-90081dc4ba42',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"eadb88a4-8df2-4d4e-8173-f67a4797e755\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":123711.34,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:48:45.356'),('965619e7-670c-4e43-9ce3-e44cc60cce9c',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":1,\"ano\":2024,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:41.151'),('98821f13-cb6d-4049-95bb-d3f25e23d1a3',NULL,'info@newtech-angola.com','CREATE_DEPARTAMENTO','Departamento','{\"args\":{\"data\":{\"nome\":\"Comercial\",\"descricao\":\"\"}}}','2026-01-30 11:30:29.061'),('9b970424-10b2-4651-8cf3-435788c40401',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":5,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:14.760'),('9bda87ae-2c3d-4f39-bbc3-2d4e01b3b7cd',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:46:14.530'),('9d854f0c-cf3d-4acb-a632-9f0f9f4acee5',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Assistente Comercial\",\"departamentoId\":\"6007ecba-d143-4f43-aed3-c1f292163233\",\"salario_base\":100000}}}','2026-01-30 11:39:11.028'),('a6285829-8099-43b5-8931-62f2cf09c06d',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"b99a9189-68e2-4de9-a786-b633d69201b0\",\"mes\":1,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:13.426'),('a83b2c7a-ef83-4f83-b6aa-05420ccfb35c',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Assistente de Direção\",\"departamentoId\":\"6007ecba-d143-4f43-aed3-c1f292163233\",\"salario_base\":100000}}}','2026-01-30 11:36:50.673'),('a863709c-07ee-4e30-a34e-849270e7c154',NULL,'info@newtech-angola.com','CREATE_DESCONTO','Desconto','{\"args\":{\"data\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"valor\":20000,\"mes_referencia\":2,\"ano_referencia\":2026,\"tipo\":\"FALTA\",\"motivo\":\"teste\"}}}','2026-02-02 13:35:46.700'),('a8a79fd8-f9e1-47f6-9007-fe9409176c3b',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:29.344'),('a9936966-08a5-4291-82f8-bd20575e7925',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":6,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:11.188'),('abf20949-740a-4378-b37d-50bf26c2fa33',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"842e2b9f-b458-4c27-abbb-44ddadb498ff\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":245500,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 14:07:52.029'),('ac832527-8ec5-43c4-b3ff-8a1505515cf6',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026,\"salario_base\":51546.39,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":51546.39,\"inss_trabalhador\":1546.39,\"inss_empresa\":4123.71,\"base_irt\":50000,\"irt_devido\":0,\"liquido_receber\":50000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:24.114'),('adb8d7d8-3969-401f-837b-1faa3e5b23f0',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Gestora de Projectos\",\"departamentoId\":\"6007ecba-d143-4f43-aed3-c1f292163233\",\"salario_base\":100000}}}','2026-01-30 11:38:27.726'),('afc456a2-4ce6-4b85-b624-32adf5943785',NULL,'info@newtech-angola.com','CREATE_DEPARTAMENTO','Departamento','{\"args\":{\"data\":{\"nome\":\"Departamento de Software\",\"descricao\":\"\"}}}','2026-01-30 11:30:17.372'),('b08d10e1-fb0f-4687-be56-7986e93f4740',NULL,'info@newtech-angola.com','CREATE_DOCUMENTO','Documento','{\"args\":{\"data\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"tipo\":\"Foto\",\"nome\":\"IMG-20251123-WA0015.jpg\",\"url\":\"https://ukfar5twganu4frg.public.blob.vercel-storage.com/uploads/rh/funcionarios/9d540e9e-58c8-4d75-ba71-ab361f26e619/1769775980222-foto-aBGYLysGg6ACCtQ75EIZ6Z4odaKkJI.webp\"}}}','2026-01-30 12:26:21.286'),('b2a5f66e-985d-4018-b7a7-5a6a12e4d02a',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026,\"salario_base\":123300,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123300,\"inss_trabalhador\":3699,\"inss_empresa\":9864,\"base_irt\":119601,\"irt_devido\":0,\"liquido_receber\":119601,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:37:49.106'),('b824af21-43b3-4172-b781-bcd33b62076b',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2024}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2024,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"total_adiantamentos\":0,\"outros_descontos\":0,\"status\":\"PROCESSADO\"}}}','2026-02-02 15:21:44.215'),('bae2a387-3603-403a-9aeb-0848e47c81a2',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":6,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:10.781'),('bb9421a2-dd78-4dc6-842c-a96272e77a4f',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":2454750,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":2454750,\"inss_trabalhador\":73642.5,\"inss_empresa\":196380,\"base_irt\":2381107.5,\"irt_devido\":489904.73,\"liquido_receber\":1891202.77,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":5,\"ano\":2026,\"salario_base\":2454750,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":2454750,\"inss_trabalhador\":73642.5,\"inss_empresa\":196380,\"base_irt\":2381107.5,\"irt_devido\":489904.73,\"liquido_receber\":1891202.77,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:12.909'),('bbc3bac5-f08d-4658-9bd6-b93003bb4c0e',NULL,'info@newtech-angola.com','CREATE_CONTRATO','Contrato','{\"args\":{\"data\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"tipo\":\"INDETERMINADO\",\"data_inicio\":\"2026-01-30T00:00:00.000Z\",\"data_fim\":null,\"renovacao_automatica\":false,\"status\":\"VIGENTE\",\"salario_base\":120000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:25:09.969'),('bc1a97f3-2435-47e0-8c0c-fa327d004acd',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"5c5f5ffb-7bee-47c4-8725-b99cdf7063c4\"},\"data\":{\"tipo\":\"ESTAGIO\",\"data_fim\":\"2026-02-23T00:00:00.000Z\",\"renovacao_automatica\":false,\"salario_base\":51505,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:43:18.968'),('bce4a20c-3005-4d32-adc6-624b25e052e7',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":4,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:03.586'),('bdd47b2b-7d46-4ac0-b2e2-0eb8c199a35b',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"5c5f5ffb-7bee-47c4-8725-b99cdf7063c4\"},\"data\":{\"tipo\":\"ESTAGIO\",\"data_fim\":\"2026-02-23T00:00:00.000Z\",\"renovacao_automatica\":false,\"salario_base\":51546.39,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:50:30.088'),('be78c297-037d-4362-bb0d-7d175e2bb8b3',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":1,\"ano\":2026,\"salario_base\":245475,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245475,\"inss_trabalhador\":7364.25,\"inss_empresa\":19638,\"base_irt\":238110.75,\"irt_devido\":38109.94,\"liquido_receber\":200000.81,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:11.150'),('c0b65aa8-b2ed-4c65-b51e-36729e4b7fd5',NULL,'info@newtech-angola.com','CREATE_TURMA','Turma','{\"args\":{\"data\":{\"cursoId\":\"cd1bc4ce-56e2-4623-b9e3-750d4b81882e\",\"codigo_turma\":\"CTH#\",\"data_inicio\":\"2026-02-03T00:00:00.000Z\",\"data_fim\":\"2027-04-30T00:00:00.000Z\",\"instrutorId\":null}}}','2026-02-02 14:52:25.168'),('c3ee5e48-0292-4133-8dbe-ef61dfe3e15e',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":3,\"ano\":2024}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":3,\"ano\":2024,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:48:00.218'),('c473606a-1da2-499f-8678-bdc40cd13d1c',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":2,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:49:28.526'),('c9b51d9b-89a4-46a3-bb23-219c6b2c4215',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":3,\"ano\":2024}},\"update\":{\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":3,\"ano\":2024,\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:47:59.815'),('ccc80dec-f6fc-477d-b0e3-badffb2c1d66',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Chefe\",\"departamentoId\":\"3f357acb-6170-4436-8cb0-42741149daf5\",\"salario_base\":100000}}}','2026-01-30 11:37:49.044'),('ce915849-4fb1-4a76-8230-1b455541e737',NULL,'info@newtech-angola.com','CREATE_DESCONTO','Desconto','{\"args\":{\"data\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"valor\":1718.213,\"mes_referencia\":2,\"ano_referencia\":2026,\"tipo\":\"FALTA\",\"motivo\":\"[AUTO] Presenças - Faltas Injustificadas (1 dias)\",\"status\":\"APROVADO\",\"observacao\":\"GERADO_AUTOMATICAMENTE\"}}}','2026-02-02 15:17:44.572'),('cec07cac-4de8-4b10-b00b-8e2df8e24115',NULL,'info@newtech-angola.com','CREATE_USER','User','{\"args\":{\"data\":{\"name\":\"Cláudio Lisboa\",\"email\":\"claudio.lisboa@newtech-angola.com\",\"password\":\"[REDACTED]\",\"role\":\"GESTOR_ACADEMICO\"},\"select\":{\"id\":true,\"name\":true,\"email\":true,\"role\":true}}}','2026-02-18 12:21:28.363'),('cef8c964-6f20-460d-89ac-397b9938cfc0',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Desenvolvedor\",\"departamentoId\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\",\"salario_base\":100000}}}','2026-01-30 11:32:47.886'),('d099f7f3-bf93-4cc9-b69c-62964d98015b',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"5c5f5ffb-7bee-47c4-8725-b99cdf7063c4\"},\"data\":{\"tipo\":\"ESTAGIO\",\"data_fim\":\"2026-02-23T00:00:00.000Z\",\"renovacao_automatica\":false,\"salario_base\":51500,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:37:27.623'),('d1d38b75-f1a4-4774-80f6-ca421768c1cf',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"de50b81e-9e85-4711-9bd7-4cd5dce4284e\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":123600,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:34:23.697'),('d3623b65-94e4-49f4-b61a-9ff77f3dd743',NULL,'info@newtech-angola.com','UPDATE_ADIANTAMENTOSALARIO','AdiantamentoSalario','{\"args\":{\"where\":{\"id\":\"0b344118-4e9c-4289-864d-3b8e379d21b6\"},\"data\":{\"status\":\"REJEITADO\"}}}','2026-02-02 15:23:31.211'),('d3b5fbe5-d15c-4475-b33c-b02e4bc063e4',NULL,'info@newtech-angola.com','UPDATE_EMPRESA','Empresa','{\"args\":{\"where\":{\"id\":\"59ac6ce2-5713-4d2f-adf6-b09b07da5752\"},\"data\":{\"logoUrl\":\"https://ukfar5twganu4frg.public.blob.vercel-storage.com/uploads/empresa/logo-1769772581227-9VKjLQ8esJy63zYLEerYRaD4CxSpV1.webp\"}}}','2026-01-30 11:29:42.786'),('d570069f-a9f6-4ce0-baf4-cf0e965a2890',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":5,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"mes\":5,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:11:13.951'),('d7996f2b-45af-403d-beaf-f0cec9704b11',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\"},\"data\":{\"nome\":\"Nelma Dias Bragança\",\"bi_documento\":\"009552848LA046\",\"email\":\"nelma.dias@newtech-angola.com\",\"telefone\":\"925879945\",\"nif\":null,\"iban\":\"AO06 004400002441064914162\",\"numero_inss\":\"xxxxxxxx3\",\"genero\":\"F\",\"data_nascimento\":\"2001-02-27T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"f06c632a-8591-4ee3-9bc6-c33f9ad708e7\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-12T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 12:50:57.264'),('d80c680a-3950-46be-a7db-c6834ef5e181',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Fulano de Tal\",\"bi_documento\":\"0065ADBB0F4005\",\"email\":\"dev.antoniomachado@gmail.com\",\"telefone\":\"955555500\",\"nif\":\"0065ADBB0F4005\",\"iban\":\"0000000000000\",\"numero_inss\":\"4343434xxx\",\"genero\":\"M\",\"data_nascimento\":\"1999-02-04T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"3bb50e11-7805-42be-9bd7-a16a2b8852e9\"}},\"departamento\":{\"connect\":{\"id\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\"}},\"data_admissao\":\"2026-02-02T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sab,Dom,Sex\"}}}','2026-02-02 15:10:26.347'),('d8f8fa14-6a8a-411e-b2db-6a4dd095185d',NULL,'info@newtech-angola.com','CREATE_FUNCIONARIO','Funcionario','{\"args\":{\"data\":{\"nome\":\"Bianca Mendes Mota\",\"bi_documento\":\"006151638LA049\",\"email\":\"bianca.mendes@newtech-angola.com\",\"telefone\":\"944240545\",\"nif\":null,\"iban\":\"A06 005100003233879310123\",\"numero_inss\":\"xxxxx1\",\"genero\":\"F\",\"data_nascimento\":\"2002-10-09T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"b957f4c3-6e7e-4490-80a8-834062a613da\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2025-08-07T00:00:00.000Z\",\"status\":\"ATIVO\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 11:56:20.422'),('da36ad24-3bd3-48dd-82e4-caccff71551c',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":6,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":6,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:13:11.999'),('dab38868-6ebb-48b5-896b-636f09c49e54',NULL,'info@newtech-angola.com','CREATE_CONTRATO','Contrato','{\"args\":{\"data\":{\"funcionarioId\":\"0d487910-65a5-4526-aa6d-080022cd426f\",\"tipo\":\"DETERMINADO\",\"data_inicio\":\"2026-02-02T00:00:00.000Z\",\"data_fim\":\"2026-02-26T00:00:00.000Z\",\"renovacao_automatica\":true,\"status\":\"VIGENTE\",\"salario_base\":120000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-02-02 15:10:27.222'),('dacc4d1c-ea06-4622-883a-51a54d4a7270',NULL,'info@newtech-angola.com','CREATE_ADIANTAMENTOSALARIO','AdiantamentoSalario','{\"args\":{\"data\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"valor\":30000,\"mes_referencia\":2,\"ano_referencia\":2026,\"motivo\":\"testee\"}}}','2026-02-02 13:36:34.033'),('dc438d23-85a2-4aba-9290-5f97b4613678',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"5c5f5ffb-7bee-47c4-8725-b99cdf7063c4\"},\"data\":{\"tipo\":\"ESTAGIO\",\"data_fim\":\"2026-02-23T00:00:00.000Z\",\"renovacao_automatica\":false,\"salario_base\":50000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 11:49:30.790'),('dd431e69-f134-475f-9a46-9b5a0dc720fe',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":245500,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245500,\"inss_trabalhador\":7365,\"inss_empresa\":19640,\"base_irt\":238135,\"irt_devido\":38114.3,\"liquido_receber\":200020.7,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"194fff4e-16a3-4558-a10a-02e51887e26d\",\"mes\":4,\"ano\":2026,\"salario_base\":245500,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":245500,\"inss_trabalhador\":7365,\"inss_empresa\":19640,\"base_irt\":238135,\"irt_devido\":38114.3,\"liquido_receber\":200020.7,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:02.781'),('e27bfef3-c222-44e9-8c45-6981e5075016',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"de50b81e-9e85-4711-9bd7-4cd5dce4284e\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":120000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:26:18.121'),('e5a9d74c-89bc-4f74-8119-e370c5b823d2',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"mes\":1,\"ano\":2026,\"salario_base\":113402.06,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":113402.06,\"inss_trabalhador\":3402.06,\"inss_empresa\":9072.16,\"base_irt\":110000,\"irt_devido\":0,\"liquido_receber\":110000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:21:11.556'),('e5b41722-f5db-46d9-9193-b61a9cfb5179',NULL,'info@newtech-angola.com','CREATE_CARGO','Cargo','{\"args\":{\"data\":{\"nome\":\"Chefe \",\"departamentoId\":\"7d9c2131-4920-4d7b-9b30-ab44ad1a4451\",\"salario_base\":120000}}}','2026-01-30 11:37:23.504'),('e65ba051-f3d0-42c4-883f-68d2dc49269c',NULL,'info@newtech-angola.com','UPSERT_PRESENCAHR','PresencaHR','{\"args\":{\"where\":{\"funcionarioId_data\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"data\":\"2026-02-02T00:00:00.000Z\"}},\"update\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"PRESENTE\",\"entrada\":\"2026-02-02T08:00:00.000Z\",\"saida\":\"2026-02-02T17:00:00.000Z\",\"horas_extras_50\":0,\"horas_extras_100\":9},\"create\":{\"funcionarioId\":\"3817c800-8d89-4641-85ae-3c8a7ce66a9c\",\"data\":\"2026-02-02T00:00:00.000Z\",\"status\":\"PRESENTE\",\"entrada\":\"2026-02-02T08:00:00.000Z\",\"saida\":\"2026-02-02T17:00:00.000Z\",\"horas_extras_50\":0,\"horas_extras_100\":9}}}','2026-02-02 15:17:42.164'),('e77584c6-f8e0-4506-b931-77168e99bdbf',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"194fff4e-16a3-4558-a10a-02e51887e26d\"},\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 14:10:56.069'),('e819241d-d6e1-410f-8d5a-2289bd86879d',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"842e2b9f-b458-4c27-abbb-44ddadb498ff\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":245475,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 14:12:52.501'),('e85ced3e-4bc2-4953-80f9-99cec96edcaf',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":2,\"ano\":2026,\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:43:35.266'),('e9926a45-6b3d-4d5f-87dc-76dabc9eb927',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":2,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:04:24.518'),('ec952c52-a815-4985-b677-3509157e50f2',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"194fff4e-16a3-4558-a10a-02e51887e26d\"},\"data\":{\"nome\":\"Elsandro Lukeny Bento Bungo\",\"bi_documento\":\"009244036LA043\",\"email\":\"elsandro.bento@newtech-angola.com\",\"telefone\":\"947715166\",\"nif\":null,\"iban\":\"AO06 005100003269918010153\",\"numero_inss\":\"xxxxxxx00000\",\"genero\":\"M\",\"data_nascimento\":\"2001-04-25T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"fc399310-29e5-459c-8b1c-42e4bb2b3891\"}},\"departamento\":{\"connect\":{\"id\":\"6fd6cb1f-1a3f-49f2-86db-44045c43d54e\"}},\"data_admissao\":\"2025-01-10T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 13:54:49.640'),('ef9616ed-3423-4bbf-9869-daaec8ba521b',NULL,'info@newtech-angola.com','UPDATE_EMPRESA','Empresa','{\"args\":{\"where\":{\"id\":\"59ac6ce2-5713-4d2f-adf6-b09b07da5752\"},\"data\":{\"nome\":\"Newtech - Prestação de Servicços\",\"endereco\":\"Talatona, Espaço avenida - Edifício Kero,2º andar, escritório nº 7.\",\"cidade\":\"Luanda\",\"pais\":\"Angola\",\"telefone\":\"921000038\",\"email\":\"info@newtech-angola.com\",\"website\":\"https://newtech-angola.com\",\"nif\":\"5001451715\",\"logoUrl\":\"https://ukfar5twganu4frg.public.blob.vercel-storage.com/uploads/empresa/logo-1769772581227-9VKjLQ8esJy63zYLEerYRaD4CxSpV1.webp\"}}}','2026-01-30 11:29:46.757'),('f4889b68-a263-424a-9170-2654854cbb4b',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":4,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":4,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 14:08:04.397'),('f7a394ee-4c03-42cc-b2c1-6c7c23028bac',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"9d540e9e-58c8-4d75-ba71-ab361f26e619\",\"mes\":1,\"ano\":2026,\"salario_base\":123711.34,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":123711.34,\"inss_trabalhador\":3711.34,\"inss_empresa\":9896.91,\"base_irt\":120000,\"irt_devido\":0,\"liquido_receber\":120000,\"status\":\"PROCESSADO\"}}}','2026-01-30 13:55:00.962'),('f7f4ab64-58bd-425c-9487-649b5c044143',NULL,'info@newtech-angola.com','UPDATE_CONTRATO','Contrato','{\"args\":{\"where\":{\"id\":\"de50b81e-9e85-4711-9bd7-4cd5dce4284e\"},\"data\":{\"tipo\":\"INDETERMINADO\",\"data_fim\":null,\"renovacao_automatica\":false,\"salario_base\":123711.34,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:47:38.477'),('f8bee1ef-e8a3-4b8f-a526-1d72a77ee0f7',NULL,'info@newtech-angola.com','UPDATE_FUNCIONARIO','Funcionario','{\"args\":{\"where\":{\"id\":\"b99a9189-68e2-4de9-a786-b633d69201b0\"},\"data\":{\"nome\":\"Laura Albertina\",\"bi_documento\":\"008315370LA042\",\"email\":\"laura.cruz@newtech-angola.com\",\"telefone\":\"924860942\",\"nif\":\"008315370LA042\",\"iban\":\"AO060040 0000 3629426710112\",\"numero_inss\":\"xxxxxxxxxxx\",\"genero\":\"F\",\"data_nascimento\":\"2005-05-01T00:00:00.000Z\",\"cargo\":{\"connect\":{\"id\":\"35ce4367-aa1f-411e-ba07-86068f7f68b3\"}},\"departamento\":{\"connect\":{\"id\":\"6007ecba-d143-4f43-aed3-c1f292163233\"}},\"data_admissao\":\"2026-01-22T00:00:00.000Z\",\"hora_entrada\":\"08:00\",\"hora_saida\":\"17:00\",\"dias_trabalho\":\"Seg,Ter,Qua,Qui,Sex\"}}}','2026-01-30 11:49:30.153'),('fc2814a3-c0c0-480a-84e0-ab0379fabc68',NULL,'info@newtech-angola.com','UPSERT_FOLHAPAGAMENTO','FolhaPagamento','{\"args\":{\"where\":{\"funcionarioId_mes_ano\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026}},\"update\":{\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"},\"create\":{\"funcionarioId\":\"70ab6a82-ed87-4e12-a3cc-9381c955a617\",\"mes\":1,\"ano\":2026,\"salario_base\":50000,\"total_subsidios_tributaveis\":0,\"total_subsidios_isentos\":0,\"total_horas_extras\":0,\"total_faltas\":0,\"faltas_count\":0,\"base_inss\":50000,\"inss_trabalhador\":1500,\"inss_empresa\":4000,\"base_irt\":48500,\"irt_devido\":0,\"liquido_receber\":48500,\"status\":\"PROCESSADO\"}}}','2026-01-30 12:37:49.912'),('fd6561ac-168e-411d-b642-583042f4e40f',NULL,'info@newtech-angola.com','CREATE_CONTRATO','Contrato','{\"args\":{\"data\":{\"funcionarioId\":\"4a170d44-1a14-4fd5-bcda-37f457abc6f6\",\"tipo\":\"INDETERMINADO\",\"data_inicio\":\"2019-01-30T00:00:00.000Z\",\"data_fim\":null,\"renovacao_automatica\":false,\"status\":\"VIGENTE\",\"salario_base\":120000,\"subsidio_alimentacao\":0,\"subsidio_transporte\":0,\"subsidio_residencia\":0,\"outros_subsidios\":0}}}','2026-01-30 12:22:26.676'),('feb9ebcc-e3f6-48d5-87bd-ea82bb48f7ac',NULL,'info@newtech-angola.com','CREATE_ALUNO','Aluno','{\"args\":{\"data\":{\"nome_completo\":\"Antonio Machado \",\"bi_documento\":\"0065ADBB0F005\",\"genero\":\"Masculino\",\"telefone\":\"948757047\",\"Endereco\":\"Hotel de convenções de Talatona -HCTA,Talatona CCB4,GU02,Luanda\",\"escolaAcademica\":\"\",\"escolaridade\":\"12ª Classe\",\"data_nascimento\":\"2026-02-03T00:00:00.000Z\",\"email\":\"d6ev.antoniomachado@gmail.com\",\"empresa\":{\"connect\":{\"id\":\"537a3afb-7a03-42cb-8e56-ac3c295ca9c2\"}},\"user\":{\"connect\":{\"id\":\"bd549ef1-2193-448e-9556-741318df44cf\"}}}}}','2026-02-02 14:53:00.674');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aulas`
--

DROP TABLE IF EXISTS `aulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aulas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `turmaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` datetime(3) NOT NULL,
  `tema` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aulas_turmaId_fkey` (`turmaId`),
  CONSTRAINT `aulas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aulas`
--

LOCK TABLES `aulas` WRITE;
/*!40000 ALTER TABLE `aulas` DISABLE KEYS */;
/*!40000 ALTER TABLE `aulas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aulaId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matriculaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nota` double NOT NULL,
  `peso` double NOT NULL DEFAULT '1',
  `instrutorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `avaliacoes_aulaId_fkey` (`aulaId`),
  KEY `avaliacoes_matriculaId_fkey` (`matriculaId`),
  KEY `avaliacoes_instrutorId_fkey` (`instrutorId`),
  CONSTRAINT `avaliacoes_aulaId_fkey` FOREIGN KEY (`aulaId`) REFERENCES `aulas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `instrutores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_templates`
--

DROP TABLE IF EXISTS `certificate_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate_templates` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mapping` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_templates`
--

LOCK TABLES `certificate_templates` WRITE;
/*!40000 ALTER TABLE `certificate_templates` DISABLE KEYS */;
INSERT INTO `certificate_templates` VALUES ('default-template-id','Modelo Padrão NewTech','/certificate-bg.png','[{\"x\":100,\"y\":250,\"fontSize\":40,\"align\":\"center\",\"path\":\"aluno.nome_completo\",\"bold\":true,\"italic\":true,\"color\":\"#004587\"},{\"x\":100,\"y\":320,\"fontSize\":16,\"align\":\"center\",\"path\":\"aluno.bi_documento\",\"bold\":true},{\"x\":100,\"y\":350,\"fontSize\":16,\"align\":\"center\",\"path\":\"turma.curso.nome\",\"bold\":true},{\"x\":700,\"y\":450,\"fontSize\":80,\"path\":\"qrCode\"},{\"x\":100,\"y\":480,\"fontSize\":12,\"align\":\"center\",\"path\":\"codigo_unico\"}]',1,'2026-01-30 10:45:34.712','2026-01-30 10:45:34.712');
/*!40000 ALTER TABLE `certificate_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matriculaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `templateId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo_unico` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash_validacao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_emissao` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `certificates_matriculaId_key` (`matriculaId`),
  UNIQUE KEY `certificates_codigo_unico_key` (`codigo_unico`),
  UNIQUE KEY `certificates_hash_validacao_key` (`hash_validacao`),
  KEY `certificates_userId_fkey` (`userId`),
  CONSTRAINT `certificates_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `certificates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `carga_horaria` int NOT NULL,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media_minima_aprovacao` double NOT NULL DEFAULT '10',
  `preco_base` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `certificateTemplateId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frequencia_minima` double NOT NULL DEFAULT '75',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cursos_certificateTemplateId_fkey` (`certificateTemplateId`),
  KEY `cursos_userId_fkey` (`userId`),
  CONSTRAINT `cursos_certificateTemplateId_fkey` FOREIGN KEY (`certificateTemplateId`) REFERENCES `certificate_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cursos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES ('cd1bc4ce-56e2-4623-b9e3-750d4b81882e','António Ulundo Machado',48,'',10,70099.990000000010000000000000000000,'2026-02-02 14:50:10.759','2026-02-02 14:50:10.759',NULL,75,NULL);
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alunoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documentos_alunoId_fkey` (`alunoId`),
  KEY `documentos_funcionarioId_fkey` (`funcionarioId`),
  CONSTRAINT `documentos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `documentos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES ('2515a55a-62e0-4ca1-bfba-2c80a6665ea4',NULL,'Foto','https://ukfar5twganu4frg.public.blob.vercel-storage.com/uploads/rh/funcionarios/9d540e9e-58c8-4d75-ba71-ab361f26e619/1769775980222-foto-aBGYLysGg6ACCtQ75EIZ6Z4odaKkJI.webp','IMG-20251123-WA0015.jpg','2026-01-30 12:26:20.800','9d540e9e-58c8-4d75-ba71-ab361f26e619'),('b0e7416d-ba45-4b76-8b25-2b0ad74b6d28',NULL,'Foto','/uploads/rh/funcionarios/0d487910-65a5-4526-aa6d-080022cd426f/1770045027719-foto.webp','99.png','2026-02-02 15:10:28.187',NULL);
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_config`
--

DROP TABLE IF EXISTS `empresa_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa_config` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nif` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Luanda',
  `pais` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Angola',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_config`
--

LOCK TABLES `empresa_config` WRITE;
/*!40000 ALTER TABLE `empresa_config` DISABLE KEYS */;
INSERT INTO `empresa_config` VALUES ('59ac6ce2-5713-4d2f-adf6-b09b07da5752','Newtech - Prestação de Servicços','5001451715','Talatona, Espaço avenida - Edifício Kero,2º andar, escritório nº 7.','921000038','info@newtech-angola.com','https://newtech-angola.com','https://ukfar5twganu4frg.public.blob.vercel-storage.com/uploads/empresa/logo-1769772581227-9VKjLQ8esJy63zYLEerYRaD4CxSpV1.webp','Luanda','Angola','2026-01-30 11:21:00.650','2026-01-30 11:29:45.797');
/*!40000 ALTER TABLE `empresa_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas_clientes`
--

DROP TABLE IF EXISTS `empresas_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas_clientes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nif` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsavel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `empresas_clientes_nif_key` (`nif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas_clientes`
--

LOCK TABLES `empresas_clientes` WRITE;
/*!40000 ALTER TABLE `empresas_clientes` DISABLE KEYS */;
INSERT INTO `empresas_clientes` VALUES ('537a3afb-7a03-42cb-8e56-ac3c295ca9c2','Newtech','565656565656','dev.antoniomachado@gmail.com','+244948757047','Hotel de convenções de Talatona -HCTA,Talatona CCB4,GU02,Luanda','','2026-02-02 14:41:12.496','2026-02-02 14:41:12.496');
/*!40000 ALTER TABLE `empresas_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrutores`
--

DROP TABLE IF EXISTS `instrutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrutores` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `bi_documento` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `especialidade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `instrutores_email_key` (`email`),
  UNIQUE KEY `instrutores_bi_documento_key` (`bi_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrutores`
--

LOCK TABLES `instrutores` WRITE;
/*!40000 ALTER TABLE `instrutores` DISABLE KEYS */;
/*!40000 ALTER TABLE `instrutores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriculas`
--

DROP TABLE IF EXISTS `matriculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matriculas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alunoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `turmaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_final` double DEFAULT NULL,
  `status_academico` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Cursando',
  `valor_total` decimal(65,30) NOT NULL,
  `valor_pago` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `estado_pagamento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pendente',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `percentual_frequencia` double DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresaClienteId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matriculas_alunoId_fkey` (`alunoId`),
  KEY `matriculas_turmaId_fkey` (`turmaId`),
  KEY `matriculas_userId_fkey` (`userId`),
  KEY `matriculas_empresaClienteId_fkey` (`empresaClienteId`),
  CONSTRAINT `matriculas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `matriculas_empresaClienteId_fkey` FOREIGN KEY (`empresaClienteId`) REFERENCES `empresas_clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `matriculas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `matriculas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriculas`
--

LOCK TABLES `matriculas` WRITE;
/*!40000 ALTER TABLE `matriculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `matriculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matriculaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(65,30) NOT NULL,
  `data` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `metodo_pagamento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pagamentos_matriculaId_fkey` (`matriculaId`),
  KEY `pagamentos_userId_fkey` (`userId`),
  CONSTRAINT `pagamentos_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pagamentos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presencas`
--

DROP TABLE IF EXISTS `presencas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presencas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aulaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alunoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `presencas_aulaId_alunoId_key` (`aulaId`,`alunoId`),
  KEY `presencas_alunoId_fkey` (`alunoId`),
  CONSTRAINT `presencas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `presencas_aulaId_fkey` FOREIGN KEY (`aulaId`) REFERENCES `aulas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presencas`
--

LOCK TABLES `presencas` WRITE;
/*!40000 ALTER TABLE `presencas` DISABLE KEYS */;
/*!40000 ALTER TABLE `presencas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_adiantamentos`
--

DROP TABLE IF EXISTS `rh_adiantamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_adiantamentos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(18,2) NOT NULL,
  `data_solicitacao` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `motivo` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDENTE',
  `mes_referencia` int NOT NULL,
  `ano_referencia` int NOT NULL,
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rh_adiantamentos_funcionarioId_fkey` (`funcionarioId`),
  CONSTRAINT `rh_adiantamentos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_adiantamentos`
--

LOCK TABLES `rh_adiantamentos` WRITE;
/*!40000 ALTER TABLE `rh_adiantamentos` DISABLE KEYS */;
INSERT INTO `rh_adiantamentos` VALUES ('0b344118-4e9c-4289-864d-3b8e379d21b6','70ab6a82-ed87-4e12-a3cc-9381c955a617',30000.00,'2026-02-02 13:36:32.244','testee','REJEITADO',2,2026,NULL,'2026-02-02 13:36:32.244','2026-02-02 15:23:29.592');
/*!40000 ALTER TABLE `rh_adiantamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_cargos`
--

DROP TABLE IF EXISTS `rh_cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_cargos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `salario_base` decimal(18,2) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `departamentoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rh_cargos_nome_departamentoId_key` (`nome`,`departamentoId`),
  KEY `rh_cargos_departamentoId_fkey` (`departamentoId`),
  CONSTRAINT `rh_cargos_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `rh_departamentos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_cargos`
--

LOCK TABLES `rh_cargos` WRITE;
/*!40000 ALTER TABLE `rh_cargos` DISABLE KEYS */;
INSERT INTO `rh_cargos` VALUES ('35ce4367-aa1f-411e-ba07-86068f7f68b3','Gestora de Projectos',NULL,100000.00,'2026-01-30 11:38:26.834','2026-01-30 11:38:26.834','6007ecba-d143-4f43-aed3-c1f292163233'),('3bb50e11-7805-42be-9bd7-a16a2b8852e9','Chefe ',NULL,120000.00,'2026-01-30 11:37:22.941','2026-01-30 11:37:22.941','7d9c2131-4920-4d7b-9b30-ab44ad1a4451'),('5a650bb9-43f8-4213-82e4-14f02011ccd8','Desenvolvedor',NULL,100000.00,'2026-01-30 11:32:46.774','2026-01-30 11:32:46.774','7d9c2131-4920-4d7b-9b30-ab44ad1a4451'),('79932bd5-72f4-46b9-8603-3abd38216155','Director Técnico',NULL,180000.00,'2026-01-30 11:33:58.901','2026-01-30 11:33:58.901','6fd6cb1f-1a3f-49f2-86db-44045c43d54e'),('b957f4c3-6e7e-4490-80a8-834062a613da','Assistente de Direção',NULL,100000.00,'2026-01-30 11:36:49.358','2026-01-30 11:36:49.358','6007ecba-d143-4f43-aed3-c1f292163233'),('c5510455-b4cf-41d4-b41a-3e078cfaee36','Chefe',NULL,100000.00,'2026-01-30 11:37:48.638','2026-01-30 11:37:48.638','3f357acb-6170-4436-8cb0-42741149daf5'),('f06c632a-8591-4ee3-9bc6-c33f9ad708e7','Assistente Comercial',NULL,100000.00,'2026-01-30 11:39:10.624','2026-01-30 11:39:10.624','6007ecba-d143-4f43-aed3-c1f292163233'),('fc399310-29e5-459c-8b1c-42e4bb2b3891','Director Técnico (CTO)',NULL,200000.00,'2026-01-30 13:30:24.999','2026-01-30 13:30:24.999','6fd6cb1f-1a3f-49f2-86db-44045c43d54e');
/*!40000 ALTER TABLE `rh_cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_configs`
--

DROP TABLE IF EXISTS `rh_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_configs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mes_referencia` int DEFAULT NULL,
  `ano_referencia` int DEFAULT NULL,
  `salario_minimo` decimal(18,2) NOT NULL DEFAULT '70000.00',
  `inss_trabalhador_pct` decimal(5,4) NOT NULL DEFAULT '0.0300',
  `inss_empresa_pct` decimal(5,4) NOT NULL DEFAULT '0.0800',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_configs`
--

LOCK TABLES `rh_configs` WRITE;
/*!40000 ALTER TABLE `rh_configs` DISABLE KEYS */;
/*!40000 ALTER TABLE `rh_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_contratos`
--

DROP TABLE IF EXISTS `rh_contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_contratos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VIGENTE',
  `salario_base` decimal(18,2) NOT NULL,
  `subsidio_alimentacao` decimal(18,2) NOT NULL DEFAULT '0.00',
  `subsidio_transporte` decimal(18,2) NOT NULL DEFAULT '0.00',
  `subsidio_residencia` decimal(18,2) NOT NULL DEFAULT '0.00',
  `outros_subsidios` decimal(18,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `renovacao_automatica` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `rh_contratos_funcionarioId_fkey` (`funcionarioId`),
  CONSTRAINT `rh_contratos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_contratos`
--

LOCK TABLES `rh_contratos` WRITE;
/*!40000 ALTER TABLE `rh_contratos` DISABLE KEYS */;
INSERT INTO `rh_contratos` VALUES ('5729847a-e669-467b-9b1f-4159499dfa69','70ab6a82-ed87-4e12-a3cc-9381c955a617','ESTAGIO','2026-01-12 00:00:00.000','2026-02-12 00:00:00.000','VIGENTE',51546.39,0.00,0.00,0.00,0.00,'2026-01-30 12:16:44.009','2026-01-30 12:50:57.424',0),('5c5f5ffb-7bee-47c4-8725-b99cdf7063c4','b99a9189-68e2-4de9-a786-b633d69201b0','ESTAGIO','2026-01-22 00:00:00.000','2026-02-23 00:00:00.000','VIGENTE',51546.39,0.00,0.00,0.00,0.00,'2026-01-30 11:46:49.299','2026-01-30 12:50:29.604',0),('842e2b9f-b458-4c27-abbb-44ddadb498ff','194fff4e-16a3-4558-a10a-02e51887e26d','INDETERMINADO','2025-01-10 00:00:00.000',NULL,'VIGENTE',245475.00,0.00,0.00,0.00,0.00,'2026-01-30 13:44:25.180','2026-01-30 14:12:52.257',0),('de50b81e-9e85-4711-9bd7-4cd5dce4284e','9d540e9e-58c8-4d75-ba71-ab361f26e619','INDETERMINADO','2026-01-30 00:00:00.000',NULL,'VIGENTE',123711.34,0.00,0.00,0.00,0.00,'2026-01-30 12:25:09.803','2026-01-30 12:47:37.994',0),('eadb88a4-8df2-4d4e-8173-f67a4797e755','4a170d44-1a14-4fd5-bcda-37f457abc6f6','INDETERMINADO','2019-01-30 00:00:00.000',NULL,'VIGENTE',123711.34,0.00,0.00,0.00,0.00,'2026-01-30 12:22:26.353','2026-01-30 12:48:44.875',0),('fffffbc5-8f04-4858-be77-644af738ade5','3817c800-8d89-4641-85ae-3c8a7ce66a9c','INDETERMINADO','2025-08-07 00:00:00.000',NULL,'VIGENTE',113402.06,0.00,0.00,0.00,0.00,'2026-01-30 11:56:20.421','2026-01-30 12:49:45.356',0);
/*!40000 ALTER TABLE `rh_contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_departamentos`
--

DROP TABLE IF EXISTS `rh_departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_departamentos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rh_departamentos_nome_key` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_departamentos`
--

LOCK TABLES `rh_departamentos` WRITE;
/*!40000 ALTER TABLE `rh_departamentos` DISABLE KEYS */;
INSERT INTO `rh_departamentos` VALUES ('3f357acb-6170-4436-8cb0-42741149daf5','Telecom','','2026-01-30 11:31:38.612','2026-01-30 11:31:47.151'),('6007ecba-d143-4f43-aed3-c1f292163233','Comercial e Gestão de Projectos','','2026-01-30 11:30:28.075','2026-01-30 11:31:16.018'),('6fd6cb1f-1a3f-49f2-86db-44045c43d54e','Direção','','2026-01-30 11:33:29.288','2026-01-30 11:33:29.288'),('7d9c2131-4920-4d7b-9b30-ab44ad1a4451','Departamento de Software','','2026-01-30 11:30:16.809','2026-01-30 11:30:16.809');
/*!40000 ALTER TABLE `rh_departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_descontos`
--

DROP TABLE IF EXISTS `rh_descontos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_descontos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(18,2) NOT NULL,
  `data_registro` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OUTRO',
  `motivo` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'APROVADO',
  `mes_referencia` int NOT NULL,
  `ano_referencia` int NOT NULL,
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rh_descontos_funcionarioId_fkey` (`funcionarioId`),
  CONSTRAINT `rh_descontos_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_descontos`
--

LOCK TABLES `rh_descontos` WRITE;
/*!40000 ALTER TABLE `rh_descontos` DISABLE KEYS */;
INSERT INTO `rh_descontos` VALUES ('6f36889d-cb13-4345-9bc7-41ef903acb6b','70ab6a82-ed87-4e12-a3cc-9381c955a617',20000.00,'2026-02-02 13:35:45.391','FALTA','teste','APROVADO',2,2026,NULL,'2026-02-02 13:35:45.391','2026-02-02 13:35:45.391'),('90e55a3c-1789-4921-9b40-c2f748471366','70ab6a82-ed87-4e12-a3cc-9381c955a617',1718.21,'2026-02-02 15:17:43.664','FALTA','[AUTO] Presenças - Faltas Injustificadas (1 dias)','APROVADO',2,2026,'GERADO_AUTOMATICAMENTE','2026-02-02 15:17:43.664','2026-02-02 15:17:43.664');
/*!40000 ALTER TABLE `rh_descontos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_ferias_solicitacoes`
--

DROP TABLE IF EXISTS `rh_ferias_solicitacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_ferias_solicitacoes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) NOT NULL,
  `dias_uteis` int NOT NULL,
  `ano_referencia` int NOT NULL,
  `tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GOZO_FERIAS',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDENTE',
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rh_ferias_solicitacoes_funcionarioId_fkey` (`funcionarioId`),
  CONSTRAINT `rh_ferias_solicitacoes_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_ferias_solicitacoes`
--

LOCK TABLES `rh_ferias_solicitacoes` WRITE;
/*!40000 ALTER TABLE `rh_ferias_solicitacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `rh_ferias_solicitacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_folhas_pagamento`
--

DROP TABLE IF EXISTS `rh_folhas_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_folhas_pagamento` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mes` int NOT NULL,
  `ano` int NOT NULL,
  `data_processamento` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `salario_base` decimal(18,2) NOT NULL,
  `total_subsidios_tributaveis` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_subsidios_isentos` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_horas_extras` decimal(18,2) NOT NULL DEFAULT '0.00',
  `total_faltas` decimal(18,2) NOT NULL DEFAULT '0.00',
  `base_inss` decimal(18,2) NOT NULL,
  `inss_trabalhador` decimal(18,2) NOT NULL,
  `inss_empresa` decimal(18,2) NOT NULL,
  `base_irt` decimal(18,2) NOT NULL,
  `irt_devido` decimal(18,2) NOT NULL,
  `outros_descontos` decimal(18,2) NOT NULL DEFAULT '0.00',
  `liquido_receber` decimal(18,2) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'RASCUNHO',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `faltas_count` int NOT NULL DEFAULT '0',
  `total_adiantamentos` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `rh_folhas_pagamento_funcionarioId_mes_ano_key` (`funcionarioId`,`mes`,`ano`),
  CONSTRAINT `rh_folhas_pagamento_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_folhas_pagamento`
--

LOCK TABLES `rh_folhas_pagamento` WRITE;
/*!40000 ALTER TABLE `rh_folhas_pagamento` DISABLE KEYS */;
INSERT INTO `rh_folhas_pagamento` VALUES ('0d3a6e21-0b62-4c5b-868a-e60b24bdeb28','3817c800-8d89-4641-85ae-3c8a7ce66a9c',1,2024,'2026-02-02 15:21:38.677',113402.06,0.00,0.00,0.00,0.00,113402.06,3402.06,9072.16,110000.00,0.00,0.00,110000.00,'PROCESSADO','2026-02-02 15:21:38.677','2026-02-02 15:21:38.677',0,0.00),('43c09331-953a-4ed2-a21d-d7da11b9ffa2','70ab6a82-ed87-4e12-a3cc-9381c955a617',1,2024,'2026-02-02 15:21:41.524',51546.39,0.00,0.00,0.00,0.00,51546.39,1546.39,4123.71,50000.00,0.00,0.00,50000.00,'PROCESSADO','2026-02-02 15:21:41.524','2026-02-02 15:21:41.524',0,0.00),('64c5267c-6b55-44d7-8a1a-2f4c6311639d','9d540e9e-58c8-4d75-ba71-ab361f26e619',1,2026,'2026-01-30 14:21:12.363',123711.34,0.00,0.00,0.00,0.00,123711.34,3711.34,9896.91,120000.00,0.00,0.00,120000.00,'PROCESSADO','2026-01-30 14:21:12.363','2026-01-30 14:21:12.363',0,0.00),('6d0bde9a-0d5c-4c8b-a397-43d49c1edb96','9d540e9e-58c8-4d75-ba71-ab361f26e619',1,2024,'2026-02-02 15:21:42.995',123711.34,0.00,0.00,0.00,0.00,123711.34,3711.34,9896.91,120000.00,0.00,0.00,120000.00,'PROCESSADO','2026-02-02 15:21:42.995','2026-02-02 15:21:42.995',0,0.00),('77283f77-6599-489b-a30b-9948d7d6c06e','194fff4e-16a3-4558-a10a-02e51887e26d',1,2024,'2026-02-02 15:21:36.538',245475.00,0.00,0.00,0.00,0.00,245475.00,7364.25,19638.00,238110.75,38109.94,0.00,200000.81,'PROCESSADO','2026-02-02 15:21:36.538','2026-02-02 15:21:36.538',0,0.00),('9bdb229e-9ac9-4f67-a03a-179845f120f2','4a170d44-1a14-4fd5-bcda-37f457abc6f6',1,2024,'2026-02-02 15:21:40.085',123711.34,0.00,0.00,0.00,0.00,123711.34,3711.34,9896.91,120000.00,0.00,0.00,120000.00,'PROCESSADO','2026-02-02 15:21:40.085','2026-02-02 15:21:40.085',0,0.00),('9e57baf1-b54f-4cb8-b52c-4a7a46b4f5c8','194fff4e-16a3-4558-a10a-02e51887e26d',1,2026,'2026-01-30 14:21:10.503',245475.00,0.00,0.00,0.00,0.00,245475.00,7364.25,19638.00,238110.75,38109.94,0.00,200000.81,'PROCESSADO','2026-01-30 14:21:10.503','2026-01-30 14:21:10.503',0,0.00),('cbe170ee-404d-42ca-a0a9-dcd0e5f49628','3817c800-8d89-4641-85ae-3c8a7ce66a9c',1,2026,'2026-01-30 14:21:11.149',113402.06,0.00,0.00,0.00,0.00,113402.06,3402.06,9072.16,110000.00,0.00,0.00,110000.00,'PROCESSADO','2026-01-30 14:21:11.149','2026-01-30 14:21:11.149',0,0.00),('cf9278e0-d2a5-41df-98a7-ba6303611285','70ab6a82-ed87-4e12-a3cc-9381c955a617',1,2026,'2026-01-30 14:21:11.959',51546.39,0.00,0.00,0.00,0.00,51546.39,1546.39,4123.71,50000.00,0.00,0.00,50000.00,'PROCESSADO','2026-01-30 14:21:11.959','2026-01-30 14:21:11.959',0,0.00),('daed9b18-e9bc-438f-ae18-f802b51cf1e6','b99a9189-68e2-4de9-a786-b633d69201b0',1,2024,'2026-02-02 15:21:44.641',51546.39,0.00,0.00,0.00,0.00,51546.39,1546.39,4123.71,50000.00,0.00,0.00,50000.00,'PROCESSADO','2026-02-02 15:21:44.641','2026-02-02 15:21:44.641',0,0.00),('f5e49b2e-72c4-4c68-8802-65cf80510ec5','b99a9189-68e2-4de9-a786-b633d69201b0',1,2026,'2026-01-30 14:21:13.015',51546.39,0.00,0.00,0.00,0.00,51546.39,1546.39,4123.71,50000.00,0.00,0.00,50000.00,'PROCESSADO','2026-01-30 14:21:13.015','2026-01-30 14:21:13.015',0,0.00),('f702fb0a-58bd-4e9e-a8fb-675e5658118b','4a170d44-1a14-4fd5-bcda-37f457abc6f6',1,2026,'2026-01-30 14:21:11.555',123711.34,0.00,0.00,0.00,0.00,123711.34,3711.34,9896.91,120000.00,0.00,0.00,120000.00,'PROCESSADO','2026-01-30 14:21:11.555','2026-01-30 14:21:11.555',0,0.00);
/*!40000 ALTER TABLE `rh_folhas_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_funcionarios`
--

DROP TABLE IF EXISTS `rh_funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_funcionarios` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bi_documento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_nascimento` datetime(3) DEFAULT NULL,
  `genero` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nif` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iban` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_inss` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_admissao` datetime(3) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ATIVO',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `cargoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departamentoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dias_trabalho` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hora_entrada` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hora_saida` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rh_funcionarios_bi_documento_key` (`bi_documento`),
  UNIQUE KEY `rh_funcionarios_email_key` (`email`),
  UNIQUE KEY `rh_funcionarios_nif_key` (`nif`),
  UNIQUE KEY `rh_funcionarios_numero_inss_key` (`numero_inss`),
  UNIQUE KEY `rh_funcionarios_userId_key` (`userId`),
  KEY `rh_funcionarios_cargoId_fkey` (`cargoId`),
  KEY `rh_funcionarios_departamentoId_fkey` (`departamentoId`),
  CONSTRAINT `rh_funcionarios_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `rh_cargos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rh_funcionarios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `rh_departamentos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `rh_funcionarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_funcionarios`
--

LOCK TABLES `rh_funcionarios` WRITE;
/*!40000 ALTER TABLE `rh_funcionarios` DISABLE KEYS */;
INSERT INTO `rh_funcionarios` VALUES ('194fff4e-16a3-4558-a10a-02e51887e26d','Elsandro Lukeny Bento Bungo','009244036LA043','elsandro.bento@newtech-angola.com','947715166','2001-04-25 00:00:00.000','M',NULL,'AO06 005100003269918010153','xxxxxxx00000','2025-01-10 00:00:00.000','ATIVO',NULL,'2026-01-30 13:44:24.538','2026-01-30 14:12:51.772','fc399310-29e5-459c-8b1c-42e4bb2b3891','6fd6cb1f-1a3f-49f2-86db-44045c43d54e','Seg,Ter,Qua,Qui,Sex','08:00','17:00'),('3817c800-8d89-4641-85ae-3c8a7ce66a9c','Bianca Mendes Mota','006151638LA049','bianca.mendes@newtech-angola.com','944240545','2002-10-09 00:00:00.000','F',NULL,'A06 005100003233879310123','xxxxx1','2025-08-07 00:00:00.000','ATIVO',NULL,'2026-01-30 11:56:19.774','2026-01-30 12:49:44.396','b957f4c3-6e7e-4490-80a8-834062a613da','6007ecba-d143-4f43-aed3-c1f292163233','Seg,Ter,Qua,Qui,Sex','08:00','17:00'),('4a170d44-1a14-4fd5-bcda-37f457abc6f6','Cláudio Júlio Lisboa','008171687LA042','claudio.lisboa@newtech-angola.com',NULL,'2002-12-06 00:00:00.000','F',NULL,'AO06 0051.0000.7275.7053.1018.6','xxxxx3','2019-01-30 00:00:00.000','ATIVO',NULL,'2026-01-30 12:22:25.696','2026-01-30 12:48:43.908','c5510455-b4cf-41d4-b41a-3e078cfaee36','3f357acb-6170-4436-8cb0-42741149daf5','Seg,Ter,Qua,Qui,Sex','08:00','17:00'),('70ab6a82-ed87-4e12-a3cc-9381c955a617','Nelma Dias Bragança','009552848LA046','nelma.dias@newtech-angola.com','925879945','2001-02-27 00:00:00.000','F',NULL,'AO06 004400002441064914162','xxxxxxxx3','2026-01-12 00:00:00.000','ATIVO',NULL,'2026-01-30 12:16:43.360','2026-01-30 12:50:56.463','f06c632a-8591-4ee3-9bc6-c33f9ad708e7','6007ecba-d143-4f43-aed3-c1f292163233','Seg,Ter,Qua,Qui,Sex','08:00','17:00'),('9d540e9e-58c8-4d75-ba71-ab361f26e619','António Ulundo Machado','008469764LA047','antonio.machado@newtech-angola.com','948575047','2002-10-28 00:00:00.000','M',NULL,'AO06 004000006973232610190','xxxxxxx3','2026-01-30 00:00:00.000','ATIVO',NULL,'2026-01-30 12:25:09.478','2026-01-30 12:47:37.027','3bb50e11-7805-42be-9bd7-a16a2b8852e9','7d9c2131-4920-4d7b-9b30-ab44ad1a4451','Seg,Ter,Qua,Qui,Sex','08:00','17:00'),('b99a9189-68e2-4de9-a786-b633d69201b0','Laura Albertina','008315370LA042','laura.cruz@newtech-angola.com','924860942','2005-05-01 00:00:00.000','F','008315370LA042','AO060040 0000 3629426710112','xxxxxxxxxxx','2026-01-22 00:00:00.000','ATIVO',NULL,'2026-01-30 11:46:48.658','2026-01-30 12:50:28.638','35ce4367-aa1f-411e-ba07-86068f7f68b3','6007ecba-d143-4f43-aed3-c1f292163233','Seg,Ter,Qua,Qui,Sex','08:00','17:00');
/*!40000 ALTER TABLE `rh_funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_presencas`
--

DROP TABLE IF EXISTS `rh_presencas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rh_presencas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcionarioId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` datetime(3) NOT NULL,
  `entrada` datetime(3) DEFAULT NULL,
  `saida` datetime(3) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `horas_normais` double NOT NULL DEFAULT '8',
  `horas_extras_50` double NOT NULL DEFAULT '0',
  `horas_extras_100` double NOT NULL DEFAULT '0',
  `horas_noturnas` double NOT NULL DEFAULT '0',
  `observacao` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rh_presencas_funcionarioId_data_key` (`funcionarioId`,`data`),
  CONSTRAINT `rh_presencas_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `rh_funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rh_presencas`
--

LOCK TABLES `rh_presencas` WRITE;
/*!40000 ALTER TABLE `rh_presencas` DISABLE KEYS */;
INSERT INTO `rh_presencas` VALUES ('755221fe-4745-4427-8714-3917c0b39ce2','b99a9189-68e2-4de9-a786-b633d69201b0','2026-02-02 00:00:00.000','2026-02-02 08:00:00.000','2026-02-02 04:06:00.000','PRESENTE',8,0,20.1,0,NULL,'2026-02-02 15:17:40.657','2026-02-02 15:17:40.657'),('ad6b70e4-5abe-4ef4-87e7-80c5d5ca0858','70ab6a82-ed87-4e12-a3cc-9381c955a617','2026-02-02 00:00:00.000',NULL,NULL,'FALTA_I',8,0,0,0,NULL,'2026-02-02 15:17:40.658','2026-02-02 15:17:40.658'),('ad77cbe5-e710-46c2-a0ea-78f36af092ff','3817c800-8d89-4641-85ae-3c8a7ce66a9c','2026-02-02 00:00:00.000','2026-02-02 08:00:00.000','2026-02-02 17:00:00.000','PRESENTE',8,0,9,0,NULL,'2026-02-02 15:17:40.650','2026-02-02 15:17:40.650');
/*!40000 ALTER TABLE `rh_presencas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_email_jobs`
--

DROP TABLE IF EXISTS `sys_email_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_email_jobs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SALARY_SLIP',
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `attempts` int NOT NULL DEFAULT '0',
  `maxAttempts` int NOT NULL DEFAULT '3',
  `lastError` text COLLATE utf8mb4_unicode_ci,
  `processedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `lockedUntil` datetime(3) DEFAULT NULL,
  `workerId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_email_jobs`
--

LOCK TABLES `sys_email_jobs` WRITE;
/*!40000 ALTER TABLE `sys_email_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_email_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_module_items`
--

DROP TABLE IF EXISTS `sys_module_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_module_items` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_module_items_key_key` (`key`),
  KEY `sys_module_items_moduleId_fkey` (`moduleId`),
  CONSTRAINT `sys_module_items_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_module_items`
--

LOCK TABLES `sys_module_items` WRITE;
/*!40000 ALTER TABLE `sys_module_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_module_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_modules`
--

DROP TABLE IF EXISTS `sys_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_modules` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_modules_name_key` (`name`),
  UNIQUE KEY `sys_modules_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_modules`
--

LOCK TABLES `sys_modules` WRITE;
/*!40000 ALTER TABLE `sys_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_profile_item_permissions`
--

DROP TABLE IF EXISTS `sys_profile_item_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_profile_item_permissions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleItemId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT '1',
  `canWrite` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_profile_item_permissions_profileId_moduleItemId_key` (`profileId`,`moduleItemId`),
  KEY `sys_profile_item_permissions_moduleItemId_fkey` (`moduleItemId`),
  CONSTRAINT `sys_profile_item_permissions_moduleItemId_fkey` FOREIGN KEY (`moduleItemId`) REFERENCES `sys_module_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_profile_item_permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_profile_item_permissions`
--

LOCK TABLES `sys_profile_item_permissions` WRITE;
/*!40000 ALTER TABLE `sys_profile_item_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_profile_item_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_profile_permissions`
--

DROP TABLE IF EXISTS `sys_profile_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_profile_permissions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT '1',
  `canWrite` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_profile_permissions_profileId_moduleId_key` (`profileId`,`moduleId`),
  KEY `sys_profile_permissions_moduleId_fkey` (`moduleId`),
  CONSTRAINT `sys_profile_permissions_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_profile_permissions_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_profile_permissions`
--

LOCK TABLES `sys_profile_permissions` WRITE;
/*!40000 ALTER TABLE `sys_profile_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_profile_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_profiles`
--

DROP TABLE IF EXISTS `sys_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_profiles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_profiles_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_profiles`
--

LOCK TABLES `sys_profiles` WRITE;
/*!40000 ALTER TABLE `sys_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_item_permissions`
--

DROP TABLE IF EXISTS `sys_user_item_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_item_permissions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleItemId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT '1',
  `canWrite` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_user_item_permissions_userId_moduleItemId_key` (`userId`,`moduleItemId`),
  KEY `sys_user_item_permissions_moduleItemId_fkey` (`moduleItemId`),
  CONSTRAINT `sys_user_item_permissions_moduleItemId_fkey` FOREIGN KEY (`moduleItemId`) REFERENCES `sys_module_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_user_item_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_item_permissions`
--

LOCK TABLES `sys_user_item_permissions` WRITE;
/*!40000 ALTER TABLE `sys_user_item_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_user_item_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_permissions`
--

DROP TABLE IF EXISTS `sys_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_permissions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT '1',
  `canWrite` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_user_permissions_userId_moduleId_key` (`userId`,`moduleId`),
  KEY `sys_user_permissions_moduleId_fkey` (`moduleId`),
  CONSTRAINT `sys_user_permissions_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `sys_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sys_user_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_permissions`
--

LOCK TABLES `sys_user_permissions` WRITE;
/*!40000 ALTER TABLE `sys_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cursoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo_turma` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) NOT NULL,
  `instrutorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Em Andamento',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `vagas` int NOT NULL DEFAULT '20',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `turmas_codigo_turma_key` (`codigo_turma`),
  KEY `turmas_cursoId_fkey` (`cursoId`),
  KEY `turmas_instrutorId_fkey` (`instrutorId`),
  KEY `turmas_userId_fkey` (`userId`),
  CONSTRAINT `turmas_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `turmas_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `instrutores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turmas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES ('19b3e41f-67ae-4ae0-9b5b-5eb501983bb2','cd1bc4ce-56e2-4623-b9e3-750d4b81882e','CTH#','2026-02-03 00:00:00.000','2027-04-30 00:00:00.000',NULL,'Em Andamento','2026-02-02 14:51:58.553','2026-02-02 14:51:58.553',20,NULL);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `language` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pt',
  `theme` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dark',
  `resetToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetTokenExpires` datetime(3) DEFAULT NULL,
  `profileId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `users_resetToken_key` (`resetToken`),
  KEY `users_profileId_fkey` (`profileId`),
  CONSTRAINT `users_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `sys_profiles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('38c29f2e-5749-4908-bc2f-17563490de43','Cláudio Lisboa','claudio.lisboa@newtech-angola.com','$2b$10$64zknONibhcC0iKnEAfbA.ayI4czkjMihcALHk5w4hKJcVW/6ygj2','GESTOR_ACADEMICO','2026-02-18 12:21:27.867','2026-02-18 12:21:27.867','pt','dark',NULL,NULL,NULL),('bd549ef1-2193-448e-9556-741318df44cf','Admin NewTech','info@newtech-angola.com','$2b$10$PLgTiNaXbpqGldTl7zLZO.a.w/Osm5dPZ3CKj/mbw2ynBV8RdApv2','ADMIN','2026-01-30 10:45:33.468','2026-01-30 10:45:33.468','pt','dark',NULL,NULL,NULL),('c6816d55-f4aa-4b18-a1ee-ed0e424001f7','Euclides Agapito','euclides.agapito@newtech-angola.com','$2b$10$kUWAPOsNSQ/qnn6s4HsOpeN1mIBE/c7MIZc6hyf1kO74zIv3ejl.m','ADMIN','2026-02-02 14:04:34.324','2026-02-02 14:04:34.324','pt','dark',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nt_nextech_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-19 12:34:48
