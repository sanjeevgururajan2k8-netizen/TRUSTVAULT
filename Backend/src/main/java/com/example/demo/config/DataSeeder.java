package com.example.demo.config;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * Seeds the PostgreSQL database with the same data previously defined in
 * the frontend's mockData.js. Only runs if the database is empty.
 */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(
            UserRepository userRepo,
            InvestigationCaseRepository caseRepo,
            FIRRepository firRepo,
            WitnessRepository witnessRepo,
            EvidenceRepository evidenceRepo,
            CustodyLogRepository custodyRepo,
            ForensicReportRepository reportRepo,
            AuditLogRepository auditRepo) {
        return args -> {
            if (userRepo.count() > 0) return; // Already seeded

            // ---- USERS ----
            List<User> users = Arrays.asList(
                user("USR-001", "IO-2201", "Aditi Sharma", "investigator@example.com", "investigation", "Cyber Crime Investigation Wing", "2026-09-07T08:12:00", "AS"),
                user("USR-002", "FO-3110", "Dr. Rakesh Verma", "forensic@example.com", "forensic", "Digital Forensics Laboratory", "2026-09-07T09:40:00", "RV"),
                user("USR-003", "CJ-0042", "Justice Meera Krishnan", "court@example.com", "court", "District Court — Cyber Bench", "2026-09-06T17:05:00", "MK"),
                user("USR-004", "AD-0001", "Arnav Sharma", "admin@example.com", "admin", "System Administration", "2026-09-07T07:55:00", "SG"),
                user("USR-005", "IO-2214", "Rohan Patil", "rohan.patil@example.com", "investigation", "Cyber Crime Investigation Wing", "2026-09-06T11:22:00", "RP"),
                user("USR-006", "FO-3122", "Kavya Nair", "kavya.nair@example.com", "forensic", "Digital Forensics Laboratory", "2026-09-05T15:48:00", "KN"),
                user("USR-007", "IO-2233", "Vikram Desai", "vikram.desai@example.com", "investigation", "Economic Offences Wing", "Deactivated", "2026-08-21T09:10:00", "VD"),
                user("USR-008", "CJ-0051", "Justice Arvind Rao", "arvind.rao@example.com", "court", "District Court — Cyber Bench", "2026-09-04T10:30:00", "AR"),
                user("USR-009", "AD-0007", "Neha Joshi", "neha.joshi@example.com", "admin", "System Administration", "2026-09-06T18:02:00", "NJ")
            );
            userRepo.saveAll(users);

            // ---- CASES ----
            InvestigationCase c1 = new InvestigationCase();
            c1.setId("CASE-2026-00421"); c1.setCaseNumber("FIR/2026/CYB/00891");
            c1.setTitle("Cyber Crime Investigation — Online Banking Fraud");
            c1.setIncidentDate("2026-09-04"); c1.setIncidentLocation("Andheri East, Mumbai, Maharashtra");
            c1.setPriority("High"); c1.setStatus("Forensic Examination");
            c1.setInvestigatorId("USR-001");
            c1.setCreatedDate(LocalDateTime.parse("2026-09-05T09:00:00"));
            c1.setLastUpdated(LocalDateTime.parse("2026-09-07T16:20:00"));
            c1.setDescription("Complainant reported unauthorized transactions totalling ₹8,42,000 from a linked savings account after clicking a phishing link received via SMS.");
            c1.setNotes("Preliminary triage indicates a phishing kit hosted on a short-lived domain.");
            c1.setEvidenceIds(Arrays.asList("EV-1042", "EV-1047", "EV-1051", "EV-1060"));
            c1.setFirId("FIR-00891"); c1.setWitnessIds(Arrays.asList("WT-01", "WT-02"));
            c1.setForensicReportIds(Arrays.asList("FR-2026-0098")); c1.setSubmittedToCourt(false);
            c1.setCaseCreatedProgress(true); c1.setFirAddedProgress(true); c1.setEvidenceCollectedProgress(true);
            c1.setForensicExaminationProgress(true); c1.setForensicReportProgress(true); c1.setCourtSubmissionProgress(false);

            InvestigationCase c2 = new InvestigationCase();
            c2.setId("CASE-2026-00422"); c2.setCaseNumber("FIR/2026/CYB/00902");
            c2.setTitle("Data Theft — Insider Threat, TechNova Pvt Ltd");
            c2.setIncidentDate("2026-09-01"); c2.setIncidentLocation("Hinjewadi, Pune, Maharashtra");
            c2.setPriority("Medium"); c2.setStatus("Evidence Pending");
            c2.setInvestigatorId("USR-001");
            c2.setCreatedDate(LocalDateTime.parse("2026-09-02T10:15:00"));
            c2.setLastUpdated(LocalDateTime.parse("2026-09-06T12:00:00"));
            c2.setDescription("Former employee suspected of exfiltrating proprietary source code and customer database prior to resignation.");
            c2.setNotes("Awaiting forensic disk image of the employee's issued laptop from IT asset recovery.");
            c2.setEvidenceIds(Arrays.asList("EV-1075")); c2.setFirId("FIR-00902");
            c2.setWitnessIds(Arrays.asList("WT-03")); c2.setForensicReportIds(Arrays.asList()); c2.setSubmittedToCourt(false);
            c2.setCaseCreatedProgress(true); c2.setFirAddedProgress(true); c2.setEvidenceCollectedProgress(false);

            InvestigationCase c3 = new InvestigationCase();
            c3.setId("CASE-2026-00423"); c3.setCaseNumber("FIR/2026/CYB/00874");
            c3.setTitle("Social Media Impersonation & Extortion");
            c3.setIncidentDate("2026-08-27"); c3.setIncidentLocation("Koramangala, Bengaluru, Karnataka");
            c3.setPriority("High"); c3.setStatus("Ready for Court");
            c3.setInvestigatorId("USR-005");
            c3.setCreatedDate(LocalDateTime.parse("2026-08-28T14:30:00"));
            c3.setLastUpdated(LocalDateTime.parse("2026-09-05T09:40:00"));
            c3.setDescription("Accused created a duplicate social media profile impersonating the complainant and demanded payment.");
            c3.setNotes("Final case package compiled; pending investigating officer sign-off before court submission.");
            c3.setEvidenceIds(Arrays.asList("EV-1080")); c3.setFirId("FIR-00874");
            c3.setWitnessIds(Arrays.asList("WT-04")); c3.setForensicReportIds(Arrays.asList("FR-2026-0101")); c3.setSubmittedToCourt(false);
            c3.setCaseCreatedProgress(true); c3.setFirAddedProgress(true); c3.setEvidenceCollectedProgress(true);
            c3.setForensicExaminationProgress(true); c3.setForensicReportProgress(true);

            InvestigationCase c4 = new InvestigationCase();
            c4.setId("CASE-2026-00424"); c4.setCaseNumber("FIR/2026/CYB/00810");
            c4.setTitle("Ransomware Attack — District Cooperative Bank");
            c4.setIncidentDate("2026-08-14"); c4.setIncidentLocation("Nashik, Maharashtra");
            c4.setPriority("High"); c4.setStatus("Submitted to Court");
            c4.setInvestigatorId("USR-001");
            c4.setCreatedDate(LocalDateTime.parse("2026-08-15T08:45:00"));
            c4.setLastUpdated(LocalDateTime.parse("2026-08-30T11:10:00"));
            c4.setDescription("Bank's internal file server was encrypted by ransomware; attacker demanded 5 BTC.");
            c4.setNotes("Court has acknowledged receipt; awaiting scheduling of review hearing.");
            c4.setEvidenceIds(Arrays.asList("EV-1090")); c4.setFirId("FIR-00810");
            c4.setWitnessIds(Arrays.asList()); c4.setForensicReportIds(Arrays.asList("FR-2026-0087"));
            c4.setSubmittedToCourt(true); c4.setCourtSubmissionDate(LocalDateTime.parse("2026-08-30T11:10:00"));
            c4.setCaseCreatedProgress(true); c4.setFirAddedProgress(true); c4.setEvidenceCollectedProgress(true);
            c4.setForensicExaminationProgress(true); c4.setForensicReportProgress(true); c4.setCourtSubmissionProgress(true);

            caseRepo.saveAll(Arrays.asList(c1, c2, c3, c4));

            // ---- FIRs ----
            firRepo.saveAll(Arrays.asList(
                fir("FIR-00891", "CASE-2026-00421", "FIR/2026/CYB/00891", "Andheri Cyber Crime Police Station", "2026-09-04", "Mr. Suresh Iyer", "Aditi Sharma", "Complainant entered credentials on a spoofed banking page; ₹8,42,000 withdrawn.", "FIR_00891_AndheriCyberPS.pdf", "2026-09-05T09:10:00"),
                fir("FIR-00902", "CASE-2026-00422", "FIR/2026/CYB/00902", "Hinjewadi Cyber Crime Police Station", "2026-09-01", "TechNova Pvt Ltd (represented by CISO)", "Aditi Sharma", "Former developer exfiltrated source code using retained VPN credentials.", "FIR_00902_HinjewadiCyberPS.pdf", "2026-09-02T10:30:00"),
                fir("FIR-00874", "CASE-2026-00423", "FIR/2026/CYB/00874", "Koramangala Cyber Crime Police Station", "2026-08-27", "Ms. Priya Nambiar", "Rohan Patil", "Fake Instagram profile created; accused demanded ₹50,000 via UPI.", "FIR_00874_KoramangalaCyberPS.pdf", "2026-08-28T14:40:00"),
                fir("FIR-00810", "CASE-2026-00424", "FIR/2026/CYB/00810", "Nashik Cyber Crime Police Station", "2026-08-14", "District Cooperative Bank (Branch Manager)", "Aditi Sharma", "Bank file server encrypted by ransomware; 5 BTC ransom demanded.", "FIR_00810_NashikCyberPS.pdf", "2026-08-15T08:55:00")
            ));

            // ---- WITNESSES ----
            witnessRepo.saveAll(Arrays.asList(
                witness("WT-01", "CASE-2026-00421", "Suresh Iyer", "Complainant / Account Holder", "2026-09-05", "I received an SMS at 10:42 AM claiming my bank account KYC needed urgent verification..."),
                witness("WT-02", "CASE-2026-00421", "Radhika Menon", "Branch Manager, Andheri East Branch", "2026-09-05", "On being alerted by the customer, we immediately flagged the account..."),
                witness("WT-03", "CASE-2026-00422", "Ananya Kulkarni", "IT Security Lead, TechNova Pvt Ltd", "2026-09-03", "Our DLP system flagged an unusual 12 GB outbound transfer to a personal cloud storage account..."),
                witness("WT-04", "CASE-2026-00423", "Priya Nambiar", "Complainant", "2026-08-28", "I noticed a duplicate account using my photos on 26 August...")
            ));

            // ---- EVIDENCE ----
            evidenceRepo.saveAll(Arrays.asList(
                evidence("EV-1042", "CASE-2026-00421", "ATM CCTV Footage — Linking Road Branch", "CCTV", "ATM_CCTV_LinkingRoad_040926.mp4", "482 MB", "Aditi Sharma", "2026-09-05T10:05:00", "A4F9C72D91E6B3F80C1D5A9E7F2B6C41D8A03F5E9B7C2D14F6A8E0C3B9D5F721", "verified", "Report Submitted", "Digital Forensics Laboratory"),
                evidence("EV-1047", "CASE-2026-00421", "Complainant Mobile Device — Forensic Image", "Mobile Extraction", "Mobile_Extraction_SureshIyer_iPhone13.zip", "6.1 GB", "Aditi Sharma", "2026-09-05T11:40:00", "B27E410CAF9931D2E8B6047FDC58A19E732CAB0459D6F1E82C4B7A0935DE21F", "verified", "Examination Completed", "Digital Forensics Laboratory"),
                evidence("EV-1051", "CASE-2026-00421", "Bank Statement & Transaction Log", "Document", "BankStatement_SureshIyer_Sep2026.pdf", "1.4 MB", "Aditi Sharma", "2026-09-05T12:15:00", "C813F5A2E9D047B6C1A8309FE624D71B0A9C5F3E8B62D410A7C9E5F318B4D6A", "verified", "Under Examination", "Digital Forensics Laboratory"),
                evidence("EV-1060", "CASE-2026-00421", "Customer Care Call Recording", "Audio", "CallRecording_BankSupport_050926.wav", "18 MB", "Aditi Sharma", "2026-09-06T09:20:00", "D40B92E7F1C6A385D0E9B4718FCA6023E9D5B7C1A4F802D6E93B5C7A1F0284D", "verified", "Sent to Forensic", "Digital Forensics Laboratory"),
                evidence("EV-1075", "CASE-2026-00422", "Employee Laptop — Disk Image (Pending)", "Document", "Pending_Asset_Recovery.txt", "—", "Aditi Sharma", "2026-09-06T10:00:00", "—", "pending", "Created", "Investigation Officer"),
                evidence("EV-1080", "CASE-2026-00423", "Chat Log & UPI Transaction Screenshots", "Image", "Screenshots_Extortion_Bundle.zip", "44 MB", "Rohan Patil", "2026-08-28T15:00:00", "E51C083FA924D6B71E0C5A398F6D2417B0A3C9E5D1F672A8B4C0E9D3F581A26", "mismatch", "Examination Completed", "Digital Forensics Laboratory"),
                evidence("EV-1090", "CASE-2026-00424", "Bank File Server — Full Disk Image", "Document", "DiskImage_CoopBankServer_140826.dd", "512 GB", "Aditi Sharma", "2026-08-15T09:30:00", "17A29B4D8E63C0F5A72D9B1E4C806FA35D9B2E7C1F408A6D3B95E2C7A0F1846", "verified", "Report Submitted", "Digital Forensics Laboratory")
            ));

            // ---- CUSTODY LOGS ----
            custodyRepo.saveAll(Arrays.asList(
                custody("EV-1042", "Aditi Sharma", "Investigation Officer", "Evidence Created & Uploaded", "2026-09-05T10:05:00", "A4F9…F721", "ok"),
                custody("EV-1042", "Aditi Sharma", "Investigation Officer", "Submitted to Forensic (Digital Forensics Laboratory)", "2026-09-05T11:05:00", "A4F9…F721", "ok"),
                custody("EV-1042", "Dr. Rakesh Verma", "Forensic Officer", "Received by Forensic Officer", "2026-09-05T11:22:00", "A4F9…F721", "ok"),
                custody("EV-1042", "Dr. Rakesh Verma", "Forensic Officer", "Examination Started", "2026-09-05T13:10:00", "A4F9…F721", "ok"),
                custody("EV-1042", "Dr. Rakesh Verma", "Forensic Officer", "Examination Completed", "2026-09-06T15:45:00", "A4F9…F721", "ok"),
                custody("EV-1042", "Dr. Rakesh Verma", "Forensic Officer", "Forensic Report Submitted (FR-2026-0098)", "2026-09-06T16:20:00", "A4F9…F721", "ok"),
                custody("EV-1047", "Aditi Sharma", "Investigation Officer", "Evidence Created & Uploaded", "2026-09-05T11:40:00", "B27E…DE21", "ok"),
                custody("EV-1047", "Aditi Sharma", "Investigation Officer", "Submitted to Forensic (Digital Forensics Laboratory)", "2026-09-05T12:00:00", "B27E…DE21", "ok"),
                custody("EV-1047", "Dr. Rakesh Verma", "Forensic Officer", "Received by Forensic Officer", "2026-09-05T12:20:00", "B27E…DE21", "ok"),
                custody("EV-1047", "Dr. Rakesh Verma", "Forensic Officer", "Examination Completed", "2026-09-06T14:12:00", "B27E…DE21", "ok"),
                custody("EV-1080", "Rohan Patil", "Investigation Officer", "Evidence Created & Uploaded", "2026-08-28T15:00:00", "E51C…81A26", "ok"),
                custody("EV-1080", "Kavya Nair", "Forensic Officer", "Received by Forensic Officer", "2026-08-29T09:40:00", "E51C…81A26", "ok"),
                custody("EV-1080", "Kavya Nair", "Forensic Officer", "Examination Completed", "2026-09-04T16:30:00", "F62D…92B37", "warn"),
                custody("EV-1090", "Aditi Sharma", "Investigation Officer", "Evidence Created & Uploaded", "2026-08-15T09:30:00", "17A2…F1846", "ok"),
                custody("EV-1090", "Dr. Rakesh Verma", "Forensic Officer", "Received by Forensic Officer", "2026-08-15T10:25:00", "17A2…F1846", "ok"),
                custody("EV-1090", "Dr. Rakesh Verma", "Forensic Officer", "Examination Completed", "2026-08-28T12:00:00", "17A2…F1846", "ok"),
                custody("EV-1090", "Dr. Rakesh Verma", "Forensic Officer", "Forensic Report Submitted (FR-2026-0087)", "2026-08-29T10:00:00", "17A2…F1846", "ok"),
                custody("EV-1090", "Aditi Sharma", "Investigation Officer", "Case Submitted to Court", "2026-08-30T11:10:00", "17A2…F1846", "ok")
            ));

            // ---- FORENSIC REPORTS ----
            ForensicReport fr1 = new ForensicReport();
            fr1.setId("FR-2026-0098"); fr1.setCaseId("CASE-2026-00421"); fr1.setEvidenceIds(Arrays.asList("EV-1042"));
            fr1.setExaminer("Dr. Rakesh Verma"); fr1.setExaminerId("USR-002"); fr1.setDate(LocalDateTime.parse("2026-09-06T16:20:00"));
            fr1.setMethod("Video Frame Analysis & Metadata Verification");
            fr1.setObservations("Footage timestamp is consistent with the ATM transaction log. Frame-by-frame analysis shows an individual in a grey hooded jacket withdrawing cash.");
            fr1.setFindings("Video container metadata is internally consistent and matches the DVR export log. No frame insertion or deletion artifacts were detected.");
            fr1.setConclusion("The footage is assessed as authentic and unaltered. Corroborates the timeline of the unauthorized cash withdrawal.");
            fr1.setStatus("Submitted"); fr1.setSupportingFiles(Arrays.asList("ELA_FrameAnalysis_EV1042.pdf", "Hash_Verification_Log_EV1042.txt"));

            ForensicReport fr2 = new ForensicReport();
            fr2.setId("FR-2026-0101"); fr2.setCaseId("CASE-2026-00423"); fr2.setEvidenceIds(Arrays.asList("EV-1080"));
            fr2.setExaminer("Kavya Nair"); fr2.setExaminerId("USR-006"); fr2.setDate(LocalDateTime.parse("2026-09-04T16:45:00"));
            fr2.setMethod("Image Metadata & Chat Log Correlation Analysis");
            fr2.setObservations("EXIF metadata on two of six submitted screenshots shows re-encoding by a third-party editing application after the reported capture date.");
            fr2.setFindings("A hash mismatch was identified on the submitted evidence bundle.");
            fr2.setConclusion("Examination flags an unresolved integrity discrepancy. Recommend re-acquisition of the original screenshot bundle.");
            fr2.setStatus("Submitted"); fr2.setSupportingFiles(Arrays.asList("Metadata_Report_EV1080.pdf"));

            ForensicReport fr3 = new ForensicReport();
            fr3.setId("FR-2026-0087"); fr3.setCaseId("CASE-2026-00424"); fr3.setEvidenceIds(Arrays.asList("EV-1090"));
            fr3.setExaminer("Dr. Rakesh Verma"); fr3.setExaminerId("USR-002"); fr3.setDate(LocalDateTime.parse("2026-08-29T10:00:00"));
            fr3.setMethod("Disk Forensic Imaging & Malware Reverse Engineering");
            fr3.setObservations("Ransomware binary identified in scheduled tasks directory. Network logs show outbound C2 beaconing to two IP addresses.");
            fr3.setFindings("Initial access vector traced to a compromised remote-desktop credential. Encrypted file headers match the identified ransomware family's signature.");
            fr3.setConclusion("Attack attributed with high confidence to a known ransomware operation. Recommend coordination with national cyber-crime cell.");
            fr3.setStatus("Submitted"); fr3.setSupportingFiles(Arrays.asList("Malware_Analysis_EV1090.pdf", "Network_Log_Extract.csv"));

            reportRepo.saveAll(Arrays.asList(fr1, fr2, fr3));

            // ---- AUDIT LOGS ----
            auditRepo.saveAll(Arrays.asList(
                auditLog("AL-1001", "2026-09-07T18:21:00", "Aditi Sharma", "investigation", "Evidence Integrity Verified", "EV-1042", "10.24.6.112", "Success"),
                auditLog("AL-1002", "2026-09-07T09:02:00", "Aditi Sharma", "investigation", "Evidence Integrity Verified", "EV-1051", "10.24.6.112", "Success"),
                auditLog("AL-1003", "2026-09-06T16:20:00", "Dr. Rakesh Verma", "forensic", "Forensic Report Submitted", "FR-2026-0098", "10.24.9.041", "Success"),
                auditLog("AL-1004", "2026-09-06T15:45:00", "Dr. Rakesh Verma", "forensic", "Examination Completed", "EV-1042", "10.24.9.041", "Success"),
                auditLog("AL-1005", "2026-09-06T14:12:00", "Dr. Rakesh Verma", "forensic", "Examination Completed", "EV-1047", "10.24.9.041", "Success"),
                auditLog("AL-1006", "2026-09-06T09:50:00", "Aditi Sharma", "investigation", "Evidence Submitted to Forensic", "EV-1060", "10.24.6.112", "Success"),
                auditLog("AL-1007", "2026-09-06T09:20:00", "Aditi Sharma", "investigation", "Evidence Uploaded", "EV-1060", "10.24.6.112", "Success"),
                auditLog("AL-1008", "2026-09-05T18:41:00", "Dr. Rakesh Verma", "forensic", "Evidence Received", "EV-1042", "10.24.9.041", "Success"),
                auditLog("AL-1009", "2026-09-05T12:00:00", "Aditi Sharma", "investigation", "Evidence Submitted to Forensic", "EV-1047", "10.24.6.112", "Success"),
                auditLog("AL-1010", "2026-09-05T11:05:00", "Aditi Sharma", "investigation", "Evidence Submitted to Forensic", "EV-1042", "10.24.6.112", "Success"),
                auditLog("AL-1011", "2026-09-05T10:05:00", "Aditi Sharma", "investigation", "Evidence Uploaded", "EV-1042", "10.24.6.112", "Success"),
                auditLog("AL-1012", "2026-09-05T09:10:00", "Aditi Sharma", "investigation", "FIR Added", "FIR-00891", "10.24.6.112", "Success"),
                auditLog("AL-1013", "2026-09-05T09:00:00", "Aditi Sharma", "investigation", "Case Created", "CASE-2026-00421", "10.24.6.112", "Success"),
                auditLog("AL-1014", "2026-09-04T16:30:00", "Kavya Nair", "forensic", "Integrity Mismatch Detected", "EV-1080", "10.24.9.055", "Warning"),
                auditLog("AL-1015", "2026-08-30T11:10:00", "Aditi Sharma", "investigation", "Case Submitted to Court", "CASE-2026-00424", "10.24.6.112", "Success"),
                auditLog("AL-1016", "2026-08-29T10:00:00", "Dr. Rakesh Verma", "forensic", "Forensic Report Submitted", "FR-2026-0087", "10.24.9.041", "Success"),
                auditLog("AL-1017", "2026-09-06T18:02:00", "Neha Joshi", "admin", "User Login", "USR-009", "10.24.1.010", "Success"),
                auditLog("AL-1018", "2026-09-06T11:47:00", "Arnav Sharma", "admin", "User Deactivated", "USR-007 (Vikram Desai)", "10.24.1.001", "Success"),
                auditLog("AL-1019", "2026-09-05T08:30:00", "Unknown", "investigation", "Failed Login Attempt", "investigator@example.com", "185.220.101.4", "Failed"),
                auditLog("AL-1020", "2026-09-04T09:15:00", "Justice Meera Krishnan", "court", "Case Reviewed", "CASE-2026-00424", "10.24.3.020", "Success"),
                auditLog("AL-1021", "2026-09-07T08:12:00", "Aditi Sharma", "investigation", "User Login", "USR-001", "10.24.6.112", "Success"),
                auditLog("AL-1022", "2026-09-07T09:40:00", "Dr. Rakesh Verma", "forensic", "User Login", "USR-002", "10.24.9.041", "Success")
            ));

            System.out.println("✅ TrustVault database seeded successfully.");
        };
    }

    // ---- Helpers ----

    private User user(String id, String empId, String name, String email, String role, String dept, String lastLogin, String initials) {
        return user(id, empId, name, email, role, dept, "Active", lastLogin, initials);
    }

    private User user(String id, String empId, String name, String email, String role, String dept, String status, String lastLogin, String initials) {
        User u = new User();
        u.setId(id); u.setEmployeeId(empId); u.setName(name); u.setEmail(email);
        u.setRole(role); u.setDepartment(dept); u.setStatus(status);
        u.setLastLogin(LocalDateTime.parse(lastLogin)); u.setBadgeInitials(initials);
        return u;
    }

    private FIR fir(String id, String caseId, String number, String station, String incidentDate,
                    String complainant, String officer, String description, String docName, String filedDate) {
        FIR f = new FIR();
        f.setId(id); f.setCaseId(caseId); f.setFirNumber(number); f.setPoliceStation(station);
        f.setIncidentDate(incidentDate); f.setComplainant(complainant); f.setOfficer(officer);
        f.setDescription(description); f.setDocumentName(docName); f.setFiledDate(LocalDateTime.parse(filedDate));
        return f;
    }

    private Witness witness(String id, String caseId, String name, String role, String date, String text) {
        Witness w = new Witness();
        w.setId(id); w.setCaseId(caseId); w.setName(name); w.setRole(role);
        w.setStatementDate(LocalDate.parse(date)); w.setStatus("Recorded"); w.setSummaryAvailable(true);
        w.setStatementText(text);
        return w;
    }

    private Evidence evidence(String id, String caseId, String name, String type, String fileName,
                               String fileSize, String uploadedBy, String uploadDate,
                               String hash, String integrity, String status, String holder) {
        Evidence e = new Evidence();
        e.setId(id); e.setCaseId(caseId); e.setName(name); e.setType(type);
        e.setFileName(fileName); e.setFileSize(fileSize); e.setUploadedBy(uploadedBy);
        e.setUploadDate(LocalDateTime.parse(uploadDate));
        e.setHashOriginal(hash); e.setHashCurrent(hash);
        e.setIntegrityStatus(integrity); e.setLastVerified(LocalDateTime.parse(uploadDate));
        e.setStatus(status); e.setCurrentHolder(holder);
        return e;
    }

    private CustodyLog custody(String evId, String actor, String role, String action, String ts, String hash, String status) {
        CustodyLog c = new CustodyLog();
        c.setEvidenceId(evId); c.setActor(actor); c.setRole(role); c.setAction(action);
        c.setTimestamp(LocalDateTime.parse(ts)); c.setHash(hash); c.setStatus(status);
        return c;
    }

    private AuditLog auditLog(String id, String ts, String actor, String role, String action, String entity, String ip, String status) {
        AuditLog a = new AuditLog();
        a.setId(id); a.setTimestamp(LocalDateTime.parse(ts)); a.setActor(actor); a.setRole(role);
        a.setAction(action); a.setEntity(entity); a.setIp(ip); a.setStatus(status);
        return a;
    }
}
