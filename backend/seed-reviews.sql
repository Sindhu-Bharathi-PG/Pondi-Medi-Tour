-- Seed Reviews for Hospitals
-- This script adds realistic patient reviews for hospitals 1-10

-- Hospital 1 Reviews (Premium Multi-Specialty)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, treatment_date, is_verified, is_approved) VALUES
(1, 'John Smith', 'john.smith@email.com', 'USA', 5, 'Excellent Knee Replacement', 'Outstanding care from Dr. Kumar and team. Recovery was smooth and painless. The facility is world-class.', 'Orthopedic Surgery', '2024-06-15', true, true),
(1, 'Sarah Johnson', 'sarah.j@email.com', 'UK', 5, 'Life-Saving Cardiac Surgery', 'Traveled from London for bypass surgery. Saved over $80,000 compared to UK private hospitals. Exceptional care!', 'Cardiology', '2024-08-22', true, true),
(1, 'Mohammed Al-Rashid', 'mohammed.ar@email.com', 'UAE', 4, 'Professional Service', 'Very good experience overall. Modern equipment and skilled doctors. Minor language barriers with some staff.', 'General Surgery', '2024-09-10', true, true),
(1, 'Emily Chen', 'emily.chen@email.com', 'Australia', 5, 'IVF Success Story!', 'After 3 failed attempts in Australia, found success here! The fertility team is incredible. Now 6 months pregnant!', 'IVF & Fertility', '2024-07-05', true, true),
(1, 'David Brown', 'd.brown@email.com', 'Canada', 5, 'Amazing Spine Surgery', 'Dr. Patel is a genius. Had spinal fusion and recovery exceeded expectations. Highly recommend!', 'Neurosurgery', '2024-10-18', true, true),
(1, 'Lisa Anderson', 'lisa.a@email.com', 'USA', 4, 'Good Cancer Treatment', 'Received chemotherapy here. Oncology team was compassionate and professional. Facilities are excellent.', 'Oncology', '2024-05-12', true, true),
(1, 'James Wilson', 'j.wilson@email.com', 'UK', 5, 'Hip Replacement Success', 'Pain-free for first time in years! Surgery went perfectly. Physical therapy team was excellent.', 'Orthopedics', '2024-11-03', true, true);

-- Hospital 2 Reviews (Government Hospital - Higher Volume)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(2, 'Priya Sharma', 'priya.s@email.com', 'Singapore', 5, 'Outstanding Emergency Care', 'Had a medical emergency while visiting. The ER team was amazing. Quick response and excellent treatment.', 'Emergency Care', '2024-09-20', true, true),
(2, 'Robert Taylor', 'r.taylor@email.com', 'USA', 4, 'Good Value Treatment', 'Affordable and professional care. Wait times were longer than private hospitals but quality was good.', 'General Medicine', '2024-07-18', true, true),
(2, 'Anna Mueller', 'anna.m@email.com', 'Germany', 5, 'Exceptional Eye Surgery', 'LASIK surgery was perfect! Vision is 20/20 now. Dr. Reddy is highly skilled.', 'Ophthalmology', '2024-08-30', true, true),
(2, 'Michael O''Brien', 'michael.ob@email.com', 'Ireland', 4, 'Solid Healthcare', 'Had appendectomy here. Professional staff, clean facilities. Recovery went well.', 'General Surgery', '2024-10-05', true, true),
(2, 'Yuki Tanaka', 'yuki.t@email.com', 'Japan', 5, 'World-Class Gastro Care', 'Suffered from severe digestive issues. The gastroenterology department diagnosed and treated me perfectly.', 'Gastroenterology', '2024-06-25', false, true);

-- Hospital 3 Reviews (Specialty Center)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(3, 'Carlos Rodriguez', 'carlos.r@email.com', 'Spain', 5, 'Dental Implants Excellence', 'Got 6 dental implants. Results are perfect and cost was 1/4 of Spain prices. Dr. Nair is amazing!', 'Dental Surgery', '2024-08-15', true, true),
(3, 'Sophie Laurent', 'sophie.l@email.com', 'France', 5, 'Perfect Smile Makeover', 'Cosmetic dentistry was exceptional. My smile transformation is incredible. Worth every penny!', 'Cosmetic Dentistry', '2024-09-28', true, true),
(3, 'Tom Harrison', 't.harrison@email.com', 'USA', 4, 'Great Dental Care', 'Root canal and crown work. Very professional and pain-free. Would recommend.', 'Dental', '2024-07-22', true, true),
(3, 'Maria Santos', 'maria.s@email.com', 'Philippines', 5, 'Best Orthodontic Work', 'Invisalign treatment exceeded expectations. Teeth are perfectly aligned now!', 'Orthodontics', '2024-10-12', false, true);

-- Hospital 4 Reviews (Cardiology Specialty)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(4, 'Richard Thompson', 'richard.t@email.com', 'USA', 5, 'Life After Heart Attack', 'Emergency angioplasty saved my life. Dr. Sharma and cardiac team are world-class. Forever grateful!', 'Cardiology', '2024-06-08', true, true),
(4, 'Patricia Wilson', 'pat.w@email.com', 'Canada', 5, 'Valve Replacement Success', 'Had mitral valve replacement. Surgery was successful and recovery smooth. Excellent cardiac care!', 'Cardiac Surgery', '2024-08-19', true, true),
(4, 'Ahmed Hassan', 'ahmed.h@email.com', 'UAE', 4, 'Good Heart Center', 'Cardiac check-up and stent placement. Professional team and modern cath lab. Happy with results.', 'Cardiology', '2024-09-15', true, true),
(4, 'Linda Chen', 'linda.c@email.com', 'USA', 5, 'Pacemaker Installation', 'Needed pacemaker. Surgery went perfectly. Follow-up care has been excellent.', 'Cardiology', '2024-07-30', true, true);

-- Hospital 5 Reviews (Orthopedic Center)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(5, 'William Davis', 'will.d@email.com', 'UK', 5, 'Total Hip Replacement', 'Back to playing golf after 3 months! Dr. Menon is highly skilled. Best decision ever.', 'Orthopedics', '2024-05-20', true, true),
(5, 'Elizabeth Brown', 'liz.b@email.com', 'Australia', 5, 'Shoulder Surgery Excellence', 'Rotator cuff repair was perfect. Physical therapy team helped me recover fully.', 'Orthopedics', '2024-07-12', true, true),
(5, 'Kevin O''Connor', 'kevin.oc@email.com', 'Ireland', 4, 'ACL Reconstruction', 'Had ACL surgery after sports injury. Recovery is going well. Good sports medicine team.', 'Sports Medicine', '2024-09-05', true, true),
(5, 'Rachel Green', 'rachel.g@email.com', 'USA', 5, 'Spinal Fusion Success', 'Years of back pain gone! Dr. Iyer is a master surgeon. Life-changing surgery.', 'Spine Surgery', '2024-06-28', true, true);

-- Hospital 6 Reviews (Women's Hospital)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(6, 'Jennifer Martin', 'jen.m@email.com', 'USA', 5, 'Beautiful Birth Experience', 'Delivered my baby here. The maternity ward is excellent. Doctors and nurses were wonderful!', 'Obstetrics', '2024-08-25', true, true),
(6, 'Claire Dubois', 'claire.d@email.com', 'France', 5, 'IVF Miracle', 'After 5 years of trying, IVF worked! Dr. Kapoor and team made our dream come true. Thank you!', 'IVF & Fertility', '2024-07-15', true, true),
(6, 'Amanda Lee', 'amanda.l@email.com', 'Singapore', 4, 'Good Gynecology Care', 'Had fibroid surgery. Professional care and good recovery. Very satisfied.', 'Gynecology', '2024-09-18', true, true);

-- Hospital 7 Reviews (Eye Hospital)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(7, 'George Anderson', 'george.a@email.com', 'UK', 5, 'Cataract Surgery Perfect', 'Both eyes done. Vision is crystal clear! No glasses needed anymore. Dr. Rao is excellent.', 'Ophthalmology', '2024-06-30', true, true),
(7, 'Maria Garcia', 'maria.g@email.com', 'Spain', 5, 'LASIK Life Changer', 'No more contacts or glasses! Best money I ever spent. Highly recommend this eye center.', 'LASIK', '2024-08-10', true, true),
(7, 'Peter Schmidt', 'peter.s@email.com', 'Germany', 4, 'Retinal Surgery Success', 'Had retinal detachment repaired. Surgery was successful. Vision is restored.', 'Retinal Surgery', '2024-09-22', true, true);

-- Hospital 8 Reviews (Cancer Center)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(8, 'Barbara White', 'barb.w@email.com', 'USA', 5, 'Beating Breast Cancer', 'Underwent surgery and chemo here. The oncology team is compassionate and skilled. In remission now!', 'Oncology', '2024-05-15', true, true),
(8, 'Christopher Lee', 'chris.l@email.com', 'Canada', 5, 'Excellent Cancer Care', 'Prostate cancer treatment was successful. Dr. Singh is highly knowledgeable. Very grateful.', 'Oncology', '2024-07-08', true, true),
(8, 'Diana Ross', 'diana.r@email.com', 'UK', 4, 'Good Radiation Therapy', 'Received radiation treatment. Staff was supportive throughout. Facilities are modern.', 'Radiation Oncology', '2024-08-20', true, true);

-- Hospital 9 Reviews (Neuro Center)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(9, 'Steven Clark', 'steven.c@email.com', 'USA', 5, 'Brain Tumor Removed', 'Had brain tumor surgery. Dr. Kumar is a brilliant neurosurgeon. Recovery exceeded expectations!', 'Neurosurgery', '2024-06-18', true, true),
(9, 'Nicole Turner', 'nicole.t@email.com', 'Australia', 5, 'Epilepsy Treatment', 'Finally seizure-free after surgery! The neuro team is world-class. Life-changing care.', 'Neurology', '2024-08-05', true, true),
(9, 'Mark Johnson', 'mark.j@email.com', 'Canada', 4, 'Spine Surgery', 'Herniated disc surgery went well. Good post-op care. Back to normal activities now.', 'Spine Surgery', '2024-09-12', true, true);

-- Hospital 10 Reviews (Multi-Specialty)
INSERT INTO reviews (hospital_id, user_name, user_email, origin, rating, title, comment, treatment_type, is_verified, is_approved) VALUES
(10, 'Jessica Parker', 'jess.p@email.com', 'USA', 5, 'Excellent All-Round Care', 'Had multiple procedures done. Every department was professional. Highly recommend!', 'Multi-Specialty', '2024-07-25', true, true),
(10, 'Paul Martinez', 'paul.m@email.com', 'Spain', 4, 'Good Hospital', 'Clean facilities and professional staff. Treatment went well. Would visit again.', 'General Surgery', '2024-08-18', true, true),
(10, 'Helen Wong', 'helen.w@email.com', 'Singapore', 5, 'Outstanding Service', 'From admission to discharge, everything was perfect. Thank you to all the staff!', 'General Medicine', '2024-09-28', true, true);

-- Verify the inserts
SELECT 'Total Reviews:' as label, COUNT(*) as count FROM reviews
UNION ALL
SELECT 'Hospital ' || hospital_id::text, COUNT(*)::text 
FROM reviews 
GROUP BY hospital_id 
ORDER BY label;

-- Show average ratings per hospital
SELECT 
    hospital_id,
    COUNT(*) as total_reviews,
    ROUND(AVG(rating), 1) as avg_rating,
    SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_star,
    SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_star,
    SUM(CASE WHEN is_verified THEN 1 ELSE 0 END) as verified_reviews
FROM reviews
GROUP BY hospital_id
ORDER BY hospital_id;
