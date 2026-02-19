-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: gestao_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('059e5c97-4eaa-40eb-8a92-cc45a464a584','a876de41f8d812ff365b79329b7b2a59e41afe8206a8fc105bf343c2c3911d7d','2026-02-09 10:36:50.678','20260209103650_scaling_email_jobs',NULL,NULL,'2026-02-09 10:36:50.659',1),('13e35986-50ab-469f-b6a5-76edfc44fc47','ca229876683db903eef3d7ef62e067ec3ef29243ccb6e826eddb8241fdceb0ca','2026-02-02 13:18:14.749','20260130145039_add_adiantamento_salario',NULL,NULL,'2026-02-02 13:18:14.576',1),('16d90495-dbc3-4aff-ace1-a3249a763bc5','6b023761b0bfebc3e05ceb4c307826b47dc5e2fe556b6f26b63b8eb1732c3dba','2026-02-02 13:18:12.605','20260123103111_iniii',NULL,NULL,'2026-02-02 13:18:12.385',1),('3295b9bb-020e-48e4-afb3-a95a62c54de2','cf1d3e39ad972480615edcbb22fc3a718dfb730bfcda9add6489934facafceb3','2026-02-02 13:18:12.002','20260122135353_init_rh',NULL,NULL,'2026-02-02 13:18:10.935',1),('37a70664-f095-4145-b80d-5970e9a4e94a','f294bbdf20823fe2104bbee0e41bb3762044391c2080ffee0301fc1c98ae6714','2026-02-02 13:18:10.930','20260109162250_add_academic_module',NULL,NULL,'2026-02-02 13:18:09.660',1),('3c21d9ab-514a-4c44-8d21-39ae27e0afc3','43ed6935b58f5ce60c7ec3b3c76f02bb08edb2a5db33a7f7cc55eeda683f5a4f','2026-02-02 13:18:09.656','20260107223737_secony',NULL,NULL,'2026-02-02 13:18:09.455',1),('5289c2c9-0e4a-46f7-86fc-ec774220514e','83cf74447ff832092ff10bd6b8cfb61e01b1df9f3287506e3d3723020b994de6','2026-02-02 13:18:09.428','20260107204546_init',NULL,NULL,'2026-02-02 13:18:07.326',1),('5e24abdf-ec6d-4a03-b403-440340b58295','9fd8223da74a16fbb7668d9c87d0249d26b58290f44ceecee44a50d3314c6075','2026-02-02 13:18:14.572','20260130104459_carg',NULL,NULL,'2026-02-02 13:18:14.525',1),('63bb41a3-cf89-4da9-b580-17198743e203','308db7e25c147f2feddb838bfbf5287673eef619c7ec679b68c77c57ab4535fe','2026-02-09 08:55:43.926','20260209085541_add_access_control',NULL,NULL,'2026-02-09 08:55:41.522',1),('6e29ca36-1d95-4db6-8f3f-da16422e3232','e97edbf58646589c591f8124765c3ccb5361afaf8be23271119ac484f70f5ccd','2026-02-02 13:18:14.521','20260127222633_empresa_cliente',NULL,NULL,'2026-02-02 13:18:14.200',1),('6e9117d2-9b2e-42eb-959e-1d8880ef642d','bb7c0a7983113bb4ba1b1faa3f73845800589def4a418cc73ee100214d04f7a1','2026-02-09 10:58:25.238','20260209105823_granular_permissions',NULL,NULL,'2026-02-09 10:58:23.891',1),('9bb4a1dc-b671-423e-827a-30b03c4f10fe','067530a4415738fdfd7b0e5330ef559f5c3a8b5428b663899eb463a8568317d1','2026-02-02 13:18:14.118','20260126160658_nn',NULL,NULL,'2026-02-02 13:18:12.610',1),('a26c4fbb-8bdc-4096-b98c-b6b03223b594','e94583bfd08a3e3b1294f52ce93de1b98d422dc711a2ae6789fdb8fdd7d787b5','2026-02-09 10:10:29.350','20260209101029_add_email_jobs',NULL,NULL,'2026-02-09 10:10:29.336',1),('c08b9117-5d29-491d-abed-a42c41121651','838921014a9d468e7cb257fe39db48250df7a5e53a6d48483d27f25d3ae729b9','2026-02-02 13:18:14.196','20260127183217_auth',NULL,NULL,'2026-02-02 13:18:14.127',1),('eeb42ade-5c8b-4402-bdc0-35f3c29bd69f','61beffca30443ef29c99bf6605e57aab2b748269abd7432d81d4621cbc72bc98','2026-02-02 13:18:34.399','20260202131834_oooo',NULL,NULL,'2026-02-02 13:18:34.128',1),('f661d955-a1e1-4259-bbe5-2d9e034bb8dc','e5882f695417dd07c49209a394628361f4bb3468ffc045ca8ae4e3d2dd59fd3a','2026-02-02 13:18:12.381','20260122152011_add_dept_cargo_optional',NULL,NULL,'2026-02-02 13:18:12.007',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alunos` (
  `id` varchar(191) NOT NULL,
  `nome_completo` varchar(191) NOT NULL,
  `bi_documento` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `data_nascimento` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `telefone` varchar(191) DEFAULT NULL,
  `genero` varchar(191) DEFAULT NULL,
  `escolaAcademica` varchar(191) DEFAULT NULL,
  `escolaridade` varchar(191) DEFAULT NULL,
  `Endereco` varchar(191) DEFAULT NULL,
  `bolseiro` tinyint(1) NOT NULL DEFAULT 0,
  `userId` varchar(191) DEFAULT NULL,
  `empresaId` varchar(191) DEFAULT NULL,
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
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_logs` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `usuario` varchar(191) DEFAULT NULL,
  `acao` varchar(191) NOT NULL,
  `entidade` varchar(191) DEFAULT NULL,
  `detalhes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES ('03f86377-f576-448e-885b-e2cd244f470c',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"00abcd15-333b-467a-a975-c500724fa494\",\"moduleId\":\"708e0f5f-abf6-422a-91e5-b1a9139574cb\",\"canRead\":false,\"canWrite\":false}}}','2026-02-13 09:43:28.819'),('137e365a-2815-40d7-84e2-738dd65ade09',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"00abcd15-333b-467a-a975-c500724fa494\",\"moduleId\":\"8a2d4f94-bdb3-4284-8c56-c3d18b929d1f\",\"canRead\":false,\"canWrite\":false}}}','2026-02-13 09:43:28.809'),('490bbff7-f4af-4d2e-b502-b5e78592c703',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"58c8d41e-3cd1-4fd2-a419-a00ef7c03b07\",\"moduleId\":\"722dee81-fdae-4a29-8277-376985808f7c\",\"canRead\":false,\"canWrite\":false}}}','2026-02-09 10:44:58.790'),('7bc8673b-ae40-4a3b-a8c2-db2c036d1866',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"58c8d41e-3cd1-4fd2-a419-a00ef7c03b07\",\"moduleId\":\"d2b72b59-bade-4752-b7e5-ad5be8d32a8e\",\"canRead\":false,\"canWrite\":false}}}','2026-02-09 10:44:58.811'),('916c83e5-2675-4d58-99eb-3261e419c017',NULL,'info@newtech-angola.com','UPDATE_EMPRESA','Empresa','{\"args\":{\"where\":{\"id\":\"6a60cadd-bc00-4ffd-8893-75c961c4ce15\"},\"data\":{\"nome\":\"Revang Tech\",\"endereco\":\"Luana\",\"cidade\":\"Luanda\",\"pais\":\"Angola\",\"telefone\":\"922444555\",\"email\":\"geral@revangtech.com\",\"website\":\"\",\"nif\":\"\",\"logoUrl\":\"\"}}}','2026-02-09 10:43:33.697'),('b114239d-e59c-44af-86d4-9aa5b19821a2',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"58c8d41e-3cd1-4fd2-a419-a00ef7c03b07\",\"moduleId\":\"8a2d4f94-bdb3-4284-8c56-c3d18b929d1f\",\"canRead\":true,\"canWrite\":true}}}','2026-02-09 10:44:58.794'),('c05c5137-f116-4333-8246-79486fb7874f',NULL,'info@newtech-angola.com','CREATE_EMPRESA','Empresa','{\"args\":{\"data\":{\"nome\":\"SGRH ANGOLA - ERP\",\"cidade\":\"Luanda\",\"pais\":\"Angola\",\"email\":\"RH@SGRH.CO.AO\"}}}','2026-02-09 10:42:59.245'),('c5d1eb3e-27a4-4593-b149-22a95e36a556',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"00abcd15-333b-467a-a975-c500724fa494\",\"moduleId\":\"d2b72b59-bade-4752-b7e5-ad5be8d32a8e\",\"canRead\":true,\"canWrite\":false}}}','2026-02-13 09:43:28.823'),('c86c3e33-c8c8-48f9-9917-eb433817b4bb',NULL,'info@newtech-angola.com','CREATE_USER','User','{\"args\":{\"data\":{\"name\":\"Machado\",\"email\":\"machado@gmail.com\",\"password\":\"[REDACTED]\",\"role\":\"USER\",\"profileId\":\"9e976d92-86e8-4155-b6ed-8d41b47a2536\"}}}','2026-02-09 10:44:58.786'),('dcc35a6f-6416-4bb4-9552-fe72163a8e49',NULL,'info@newtech-angola.com','CREATE_USER','User','{\"args\":{\"data\":{\"name\":\"Madalena\",\"email\":\"madalena@newtech-angola.com\",\"password\":\"[REDACTED]\",\"role\":\"RH\",\"profileId\":\"a44970cf-8a76-4ba1-8279-17e3d36cb55a\"}}}','2026-02-13 09:43:28.772'),('e7b25ff4-d2e1-46dc-9765-7396d48ae13c',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"58c8d41e-3cd1-4fd2-a419-a00ef7c03b07\",\"moduleId\":\"708e0f5f-abf6-422a-91e5-b1a9139574cb\",\"canRead\":true,\"canWrite\":false}}}','2026-02-09 10:44:58.798'),('ff0996b0-3cf7-4f8b-9410-211000a735d4',NULL,'info@newtech-angola.com','CREATE_USERPERMISSION','UserPermission','{\"args\":{\"data\":{\"userId\":\"00abcd15-333b-467a-a975-c500724fa494\",\"moduleId\":\"722dee81-fdae-4a29-8277-376985808f7c\",\"canRead\":false,\"canWrite\":false}}}','2026-02-13 09:43:28.794');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aulas`
--

DROP TABLE IF EXISTS `aulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aulas` (
  `id` varchar(191) NOT NULL,
  `turmaId` varchar(191) NOT NULL,
  `data` datetime(3) NOT NULL,
  `tema` varchar(191) NOT NULL,
  `tipo` varchar(191) NOT NULL DEFAULT 'normal',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacoes` (
  `id` varchar(191) NOT NULL,
  `aulaId` varchar(191) DEFAULT NULL,
  `matriculaId` varchar(191) NOT NULL,
  `tipo` varchar(191) NOT NULL,
  `nota` double NOT NULL,
  `peso` double NOT NULL DEFAULT 1,
  `instrutorId` varchar(191) DEFAULT NULL,
  `observacao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificate_templates` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `mapping` text NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_templates`
--

LOCK TABLES `certificate_templates` WRITE;
/*!40000 ALTER TABLE `certificate_templates` DISABLE KEYS */;
INSERT INTO `certificate_templates` VALUES ('default-template-id','Modelo Padrão NewTech','/certificate-bg.png','[{\"x\":100,\"y\":250,\"fontSize\":40,\"align\":\"center\",\"path\":\"aluno.nome_completo\",\"bold\":true,\"italic\":true,\"color\":\"#004587\"},{\"x\":100,\"y\":320,\"fontSize\":16,\"align\":\"center\",\"path\":\"aluno.bi_documento\",\"bold\":true},{\"x\":100,\"y\":350,\"fontSize\":16,\"align\":\"center\",\"path\":\"turma.curso.nome\",\"bold\":true},{\"x\":700,\"y\":450,\"fontSize\":80,\"path\":\"qrCode\"},{\"x\":100,\"y\":480,\"fontSize\":12,\"align\":\"center\",\"path\":\"codigo_unico\"}]',1,'2026-02-02 13:18:58.216','2026-02-09 08:59:35.392');
/*!40000 ALTER TABLE `certificate_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificates` (
  `id` varchar(191) NOT NULL,
  `matriculaId` varchar(191) NOT NULL,
  `templateId` varchar(191) DEFAULT NULL,
  `codigo_unico` varchar(191) NOT NULL,
  `hash_validacao` varchar(191) NOT NULL,
  `data_emissao` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `certificates_matriculaId_key` (`matriculaId`),
  UNIQUE KEY `certificates_codigo_unico_key` (`codigo_unico`),
  UNIQUE KEY `certificates_hash_validacao_key` (`hash_validacao`),
  KEY `certificates_userId_fkey` (`userId`),
  CONSTRAINT `certificates_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas` (`id`) ON UPDATE CASCADE,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `carga_horaria` int(11) NOT NULL,
  `descricao` varchar(191) DEFAULT NULL,
  `media_minima_aprovacao` double NOT NULL DEFAULT 10,
  `preco_base` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `certificateTemplateId` varchar(191) DEFAULT NULL,
  `frequencia_minima` double NOT NULL DEFAULT 75,
  `userId` varchar(191) DEFAULT NULL,
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
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentos` (
  `id` varchar(191) NOT NULL,
  `alunoId` varchar(191) DEFAULT NULL,
  `tipo` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `funcionarioId` varchar(191) DEFAULT NULL,
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
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_config`
--

DROP TABLE IF EXISTS `empresa_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa_config` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `nif` varchar(191) DEFAULT NULL,
  `endereco` varchar(191) DEFAULT NULL,
  `telefone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `logoUrl` varchar(191) DEFAULT NULL,
  `cidade` varchar(191) DEFAULT 'Luanda',
  `pais` varchar(191) DEFAULT 'Angola',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_config`
--

LOCK TABLES `empresa_config` WRITE;
/*!40000 ALTER TABLE `empresa_config` DISABLE KEYS */;
INSERT INTO `empresa_config` VALUES ('6a60cadd-bc00-4ffd-8893-75c961c4ce15','Revang Tech','','Luana','922444555','geral@revangtech.com','','','Luanda','Angola','2026-02-09 10:42:59.219','2026-02-09 10:43:33.657');
/*!40000 ALTER TABLE `empresa_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas_clientes`
--

DROP TABLE IF EXISTS `empresas_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas_clientes` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `nif` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `telefone` varchar(191) DEFAULT NULL,
  `endereco` varchar(191) DEFAULT NULL,
  `responsavel` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40000 ALTER TABLE `empresas_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrutores`
--

DROP TABLE IF EXISTS `instrutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instrutores` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `bi_documento` varchar(191) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `especialidade` varchar(191) DEFAULT NULL,
  `genero` varchar(191) DEFAULT NULL,
  `telefone` varchar(191) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matriculas` (
  `id` varchar(191) NOT NULL,
  `alunoId` varchar(191) NOT NULL,
  `turmaId` varchar(191) NOT NULL,
  `media_final` double DEFAULT NULL,
  `status_academico` varchar(191) NOT NULL DEFAULT 'Cursando',
  `valor_total` decimal(65,30) NOT NULL,
  `valor_pago` decimal(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,
  `estado_pagamento` varchar(191) NOT NULL DEFAULT 'Pendente',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `percentual_frequencia` double DEFAULT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `empresaClienteId` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matriculas_alunoId_fkey` (`alunoId`),
  KEY `matriculas_turmaId_fkey` (`turmaId`),
  KEY `matriculas_userId_fkey` (`userId`),
  KEY `matriculas_empresaClienteId_fkey` (`empresaClienteId`),
  CONSTRAINT `matriculas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `matriculas_empresaClienteId_fkey` FOREIGN KEY (`empresaClienteId`) REFERENCES `empresas_clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `matriculas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas` (`id`) ON UPDATE CASCADE,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamentos` (
  `id` varchar(191) NOT NULL,
  `matriculaId` varchar(191) NOT NULL,
  `valor` decimal(65,30) NOT NULL,
  `data` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `metodo_pagamento` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pagamentos_matriculaId_fkey` (`matriculaId`),
  KEY `pagamentos_userId_fkey` (`userId`),
  CONSTRAINT `pagamentos_matriculaId_fkey` FOREIGN KEY (`matriculaId`) REFERENCES `matriculas` (`id`) ON UPDATE CASCADE,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presencas` (
  `id` varchar(191) NOT NULL,
  `aulaId` varchar(191) NOT NULL,
  `alunoId` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_adiantamentos` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `valor` decimal(18,2) NOT NULL,
  `data_solicitacao` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `motivo` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDENTE',
  `mes_referencia` int(11) NOT NULL,
  `ano_referencia` int(11) NOT NULL,
  `observacao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40000 ALTER TABLE `rh_adiantamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_cargos`
--

DROP TABLE IF EXISTS `rh_cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_cargos` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `descricao` text DEFAULT NULL,
  `salario_base` decimal(18,2) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `departamentoId` varchar(191) DEFAULT NULL,
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
/*!40000 ALTER TABLE `rh_cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_configs`
--

DROP TABLE IF EXISTS `rh_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_configs` (
  `id` varchar(191) NOT NULL,
  `mes_referencia` int(11) DEFAULT NULL,
  `ano_referencia` int(11) DEFAULT NULL,
  `salario_minimo` decimal(18,2) NOT NULL DEFAULT 70000.00,
  `inss_trabalhador_pct` decimal(5,4) NOT NULL DEFAULT 0.0300,
  `inss_empresa_pct` decimal(5,4) NOT NULL DEFAULT 0.0800,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_contratos` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `tipo` varchar(191) NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'VIGENTE',
  `salario_base` decimal(18,2) NOT NULL,
  `subsidio_alimentacao` decimal(18,2) NOT NULL DEFAULT 0.00,
  `subsidio_transporte` decimal(18,2) NOT NULL DEFAULT 0.00,
  `subsidio_residencia` decimal(18,2) NOT NULL DEFAULT 0.00,
  `outros_subsidios` decimal(18,2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `renovacao_automatica` tinyint(1) NOT NULL DEFAULT 0,
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
/*!40000 ALTER TABLE `rh_contratos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_departamentos`
--

DROP TABLE IF EXISTS `rh_departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_departamentos` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `descricao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40000 ALTER TABLE `rh_departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_descontos`
--

DROP TABLE IF EXISTS `rh_descontos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_descontos` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `valor` decimal(18,2) NOT NULL,
  `data_registro` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `tipo` varchar(191) NOT NULL DEFAULT 'OUTRO',
  `motivo` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'APROVADO',
  `mes_referencia` int(11) NOT NULL,
  `ano_referencia` int(11) NOT NULL,
  `observacao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40000 ALTER TABLE `rh_descontos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_ferias_solicitacoes`
--

DROP TABLE IF EXISTS `rh_ferias_solicitacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_ferias_solicitacoes` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) NOT NULL,
  `dias_uteis` int(11) NOT NULL,
  `ano_referencia` int(11) NOT NULL,
  `tipo` varchar(191) NOT NULL DEFAULT 'GOZO_FERIAS',
  `status` varchar(191) NOT NULL DEFAULT 'PENDENTE',
  `observacao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_folhas_pagamento` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `mes` int(11) NOT NULL,
  `ano` int(11) NOT NULL,
  `data_processamento` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `salario_base` decimal(18,2) NOT NULL,
  `total_subsidios_tributaveis` decimal(18,2) NOT NULL DEFAULT 0.00,
  `total_subsidios_isentos` decimal(18,2) NOT NULL DEFAULT 0.00,
  `total_horas_extras` decimal(18,2) NOT NULL DEFAULT 0.00,
  `total_faltas` decimal(18,2) NOT NULL DEFAULT 0.00,
  `base_inss` decimal(18,2) NOT NULL,
  `inss_trabalhador` decimal(18,2) NOT NULL,
  `inss_empresa` decimal(18,2) NOT NULL,
  `base_irt` decimal(18,2) NOT NULL,
  `irt_devido` decimal(18,2) NOT NULL,
  `outros_descontos` decimal(18,2) NOT NULL DEFAULT 0.00,
  `liquido_receber` decimal(18,2) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'RASCUNHO',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `faltas_count` int(11) NOT NULL DEFAULT 0,
  `total_adiantamentos` decimal(18,2) NOT NULL DEFAULT 0.00,
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
/*!40000 ALTER TABLE `rh_folhas_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_funcionarios`
--

DROP TABLE IF EXISTS `rh_funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_funcionarios` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `bi_documento` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `telefone` varchar(191) DEFAULT NULL,
  `data_nascimento` datetime(3) DEFAULT NULL,
  `genero` varchar(191) DEFAULT NULL,
  `nif` varchar(191) DEFAULT NULL,
  `iban` varchar(191) DEFAULT NULL,
  `numero_inss` varchar(191) DEFAULT NULL,
  `data_admissao` datetime(3) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'ATIVO',
  `userId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `cargoId` varchar(191) DEFAULT NULL,
  `departamentoId` varchar(191) DEFAULT NULL,
  `dias_trabalho` varchar(191) DEFAULT NULL,
  `hora_entrada` varchar(191) DEFAULT NULL,
  `hora_saida` varchar(191) DEFAULT NULL,
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
/*!40000 ALTER TABLE `rh_funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rh_presencas`
--

DROP TABLE IF EXISTS `rh_presencas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rh_presencas` (
  `id` varchar(191) NOT NULL,
  `funcionarioId` varchar(191) NOT NULL,
  `data` datetime(3) NOT NULL,
  `entrada` datetime(3) DEFAULT NULL,
  `saida` datetime(3) DEFAULT NULL,
  `status` varchar(191) NOT NULL,
  `horas_normais` double NOT NULL DEFAULT 8,
  `horas_extras_50` double NOT NULL DEFAULT 0,
  `horas_extras_100` double NOT NULL DEFAULT 0,
  `horas_noturnas` double NOT NULL DEFAULT 0,
  `observacao` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40000 ALTER TABLE `rh_presencas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_email_jobs`
--

DROP TABLE IF EXISTS `sys_email_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_email_jobs` (
  `id` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'SALARY_SLIP',
  `payload` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `attempts` int(11) NOT NULL DEFAULT 0,
  `maxAttempts` int(11) NOT NULL DEFAULT 3,
  `lastError` text DEFAULT NULL,
  `processedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `lockedUntil` datetime(3) DEFAULT NULL,
  `workerId` varchar(191) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_module_items` (
  `id` varchar(191) NOT NULL,
  `moduleId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_modules` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `sys_modules` VALUES ('708e0f5f-abf6-422a-91e5-b1a9139574cb','Recursos Humanos','rh_mod','Módulo de recursos humanos','2026-02-09 08:59:35.169','2026-02-09 08:59:35.169'),('722dee81-fdae-4a29-8277-376985808f7c','Financeiro','financeiro_mod','Módulo financeiro e pagamentos','2026-02-09 08:59:35.159','2026-02-09 08:59:35.159'),('8a2d4f94-bdb3-4284-8c56-c3d18b929d1f','Gestão de Cursos','gestao_cursos','Módulo de cursos, turmas e alunos','2026-02-09 08:59:35.145','2026-02-09 08:59:35.145'),('d2b72b59-bade-4752-b7e5-ad5be8d32a8e','Sistema','sistema','Configurações e auditoria','2026-02-09 08:59:35.181','2026-02-09 08:59:35.181');
/*!40000 ALTER TABLE `sys_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_profile_item_permissions`
--

DROP TABLE IF EXISTS `sys_profile_item_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_profile_item_permissions` (
  `id` varchar(191) NOT NULL,
  `profileId` varchar(191) NOT NULL,
  `moduleItemId` varchar(191) NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT 1,
  `canWrite` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_profile_permissions` (
  `id` varchar(191) NOT NULL,
  `profileId` varchar(191) NOT NULL,
  `moduleId` varchar(191) NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT 1,
  `canWrite` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `sys_profile_permissions` VALUES ('7ccef090-ee8a-4e2e-b238-b036eae6bd83','38ea223d-880f-4239-996b-430bd75e39df','722dee81-fdae-4a29-8277-376985808f7c',1,1,'2026-02-09 08:59:35.213','2026-02-09 08:59:35.213'),('8202ab0c-e942-4cb7-945d-047e1af6a81a','38ea223d-880f-4239-996b-430bd75e39df','d2b72b59-bade-4752-b7e5-ad5be8d32a8e',1,1,'2026-02-09 08:59:35.230','2026-02-09 08:59:35.230'),('8a7b431a-6a1d-4067-8d7a-2417b65c46b1','38ea223d-880f-4239-996b-430bd75e39df','8a2d4f94-bdb3-4284-8c56-c3d18b929d1f',1,1,'2026-02-09 08:59:35.201','2026-02-09 08:59:35.201'),('961ca2ff-13d5-4e36-81e6-04cf65f14c45','9e976d92-86e8-4155-b6ed-8d41b47a2536','8a2d4f94-bdb3-4284-8c56-c3d18b929d1f',1,1,'2026-02-09 08:59:35.327','2026-02-09 08:59:35.327'),('e83f3f81-f178-476e-ad91-a95b3d238cb6','38ea223d-880f-4239-996b-430bd75e39df','708e0f5f-abf6-422a-91e5-b1a9139574cb',1,1,'2026-02-09 08:59:35.222','2026-02-09 08:59:35.222');
/*!40000 ALTER TABLE `sys_profile_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_profiles`
--

DROP TABLE IF EXISTS `sys_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_profiles` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `sys_profiles` VALUES ('38ea223d-880f-4239-996b-430bd75e39df','Administrador','Acesso total ao sistema','2026-02-09 08:59:35.190','2026-02-09 08:59:35.190'),('6c615fef-737d-4aaa-bd17-79f4fcf9d047','Financeiro','Gestão financeira','2026-02-09 08:59:35.335','2026-02-09 08:59:35.335'),('9e976d92-86e8-4155-b6ed-8d41b47a2536','Gestor Académico','Gestão de cursos e alunos','2026-02-09 08:59:35.248','2026-02-09 08:59:35.248'),('a44970cf-8a76-4ba1-8279-17e3d36cb55a','RH','Gestão de recursos humanos','2026-02-09 08:59:35.343','2026-02-09 08:59:35.343');
/*!40000 ALTER TABLE `sys_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_item_permissions`
--

DROP TABLE IF EXISTS `sys_user_item_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user_item_permissions` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `moduleItemId` varchar(191) NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT 1,
  `canWrite` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user_permissions` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `moduleId` varchar(191) NOT NULL,
  `canRead` tinyint(1) NOT NULL DEFAULT 1,
  `canWrite` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
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
INSERT INTO `sys_user_permissions` VALUES ('31882fcc-34ab-48d2-8667-81f8528fd588','58c8d41e-3cd1-4fd2-a419-a00ef7c03b07','708e0f5f-abf6-422a-91e5-b1a9139574cb',1,0,'2026-02-09 10:44:58.792','2026-02-09 10:44:58.792'),('62bd8641-7f08-4b64-8921-6fadd73271c9','00abcd15-333b-467a-a975-c500724fa494','722dee81-fdae-4a29-8277-376985808f7c',0,0,'2026-02-13 09:43:28.768','2026-02-13 09:43:28.768'),('644abdda-b802-4cc9-815c-d09c9e7e4294','58c8d41e-3cd1-4fd2-a419-a00ef7c03b07','722dee81-fdae-4a29-8277-376985808f7c',0,0,'2026-02-09 10:44:58.783','2026-02-09 10:44:58.783'),('6f414a88-c85d-492c-b0bb-3889c0478bf0','00abcd15-333b-467a-a975-c500724fa494','708e0f5f-abf6-422a-91e5-b1a9139574cb',0,0,'2026-02-13 09:43:28.807','2026-02-13 09:43:28.807'),('7f3953a5-0775-41de-ba2b-594784e98c67','58c8d41e-3cd1-4fd2-a419-a00ef7c03b07','8a2d4f94-bdb3-4284-8c56-c3d18b929d1f',1,1,'2026-02-09 10:44:58.788','2026-02-09 10:44:58.788'),('cc174da0-4414-4e7c-a731-eaa7836571be','58c8d41e-3cd1-4fd2-a419-a00ef7c03b07','d2b72b59-bade-4752-b7e5-ad5be8d32a8e',0,0,'2026-02-09 10:44:58.795','2026-02-09 10:44:58.795'),('e0773a94-27fa-4c05-9722-63fbdd56a693','00abcd15-333b-467a-a975-c500724fa494','d2b72b59-bade-4752-b7e5-ad5be8d32a8e',1,0,'2026-02-13 09:43:28.815','2026-02-13 09:43:28.815'),('f68da67f-1819-4761-87af-38c07ce7c172','00abcd15-333b-467a-a975-c500724fa494','8a2d4f94-bdb3-4284-8c56-c3d18b929d1f',0,0,'2026-02-13 09:43:28.791','2026-02-13 09:43:28.791');
/*!40000 ALTER TABLE `sys_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turmas` (
  `id` varchar(191) NOT NULL,
  `cursoId` varchar(191) NOT NULL,
  `codigo_turma` varchar(191) NOT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_fim` datetime(3) NOT NULL,
  `instrutorId` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Em Andamento',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `vagas` int(11) NOT NULL DEFAULT 20,
  `userId` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `turmas_codigo_turma_key` (`codigo_turma`),
  KEY `turmas_cursoId_fkey` (`cursoId`),
  KEY `turmas_instrutorId_fkey` (`instrutorId`),
  KEY `turmas_userId_fkey` (`userId`),
  CONSTRAINT `turmas_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `turmas_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `instrutores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turmas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'USER',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `language` varchar(191) NOT NULL DEFAULT 'pt',
  `theme` varchar(191) NOT NULL DEFAULT 'dark',
  `resetToken` varchar(191) DEFAULT NULL,
  `resetTokenExpires` datetime(3) DEFAULT NULL,
  `profileId` varchar(191) DEFAULT NULL,
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
INSERT INTO `users` VALUES ('00abcd15-333b-467a-a975-c500724fa494','Madalena','madalena@newtech-angola.com','$2b$10$3zJ7uIIRwJ7u2K06W/tFwOeQcCT/iPDVMIPN3OW8u6jI.UFwjEjCe','RH','2026-02-13 09:43:28.732','2026-02-13 09:43:28.732','pt','dark',NULL,NULL,'a44970cf-8a76-4ba1-8279-17e3d36cb55a'),('58c8d41e-3cd1-4fd2-a419-a00ef7c03b07','Machado','machado@gmail.com','$2b$10$VIRrGq2ixZpnVg8R0dnNu.azJ3.dC1BZt7Q.fbSdwNeihPC9/9lDO','USER','2026-02-09 10:44:58.775','2026-02-09 10:44:58.775','pt','dark',NULL,NULL,'9e976d92-86e8-4155-b6ed-8d41b47a2536'),('66387ca7-f69b-4582-95eb-cf0e7b284b45','Admin NewTech','info@newtech-angola.com','$2b$10$Qj9cokIH52eg.vR2ZuT98uW5CZh0UvAavBc9L.5ASBpnUKgZC1b4y','ADMIN','2026-02-02 13:18:58.172','2026-02-09 08:59:35.238','pt','dark',NULL,NULL,'38ea223d-880f-4239-996b-430bd75e39df');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gestao_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-19 12:45:40
