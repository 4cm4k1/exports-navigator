


-- This will GET ALL information based on an INDUSTRY search

SELECT *
FROM industries
JOIN contacts ON (contacts.id = industries.contact_1 OR contacts.id = industries.contact_2 OR contacts.id = industries.contact_3)
JOIN websites ON (websites.id = industries.website_1 OR websites.id = industries.website_2 OR websites.id = industries.website_3);


-- This will GET ALL information based on a TOPIC search

SELECT *
FROM topics
JOIN contacts ON (contacts.id = topics.contact_1 OR contacts.id = topics.contact_2 OR contacts.id = topics.contact_3)
JOIN websites ON (websites.id = topics.website_1 OR websites.id = topics.website_2 OR websites.id = topics.website_3);



-- This will GET ALL information based on a COUNTRY search
SELECT *
FROM countries
JOIN contacts ON contacts.id = countries.contact_id;






-- This will allow a user to look up a list of contacts (and contact info) searching by a specific industry.
-- 'Food' will be replaced with something like request.body.industry

SELECT contacts.first_name, contacts.last_name, contacts.title, contacts.organization, contacts.email, contacts.phone
FROM contacts
JOIN industries ON (contacts.id = industries.contact_1 OR contacts.id = industries.contact_2 OR contacts.id = industries.contact_3)
WHERE industries.industry = 'Food';




-- This will allow a user to look up a list of websites searching by a specific industry.
-- 'Food' will be replaced with something like request.body.industry
SELECT website
FROM websites
JOIN industries ON (websites.id = industries.website_1 OR websites.id = industries.website_2 OR websites.id = industries.website_3)
WHERE industries.industry = 'Food';


-- This will allow a user to look up a list of contacts (and contact info) when searching by a specific TOPIC.
-- 'Topic' will be replaced with something request.body.topic
