The API is now available on http://gbldncommoniisdev1a:82/Spirata

To get all the statuses I currently have(to be confirmed) you can call http://gbldncommoniisdev1a:82/Spirata/Status

All the feeds are accessible through http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed
You can access a specific one by pitting in the id in brackets - http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed(1)
If you want to filter the result set you can try: 

http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed?$filter=ReportDate eq 2018-03-01T00:00:00Z
http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed?$filter=ReportDate gt 2012-05-29T00:00:00Z
http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed?$filter=ReportDate ge 2018-01-01T00:00:00Z and ReportDate le 2018-03-01T00:00:00Z
http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed?$filter=StatusId eq 1

To update the Approved Quantity you will need to make a PATCH http call and you don’t need to send the whole object but just the field you are updating. 
In this case 
http://gbldncommoniisdev1a:82/Spirata/LiftingsFeed(1) where 1 is the Id of the line you are updating and the object you pass on only has: 
{
"QuantityApproved": 500, 
}

Currently you should be able to update only QuantityApproved and Comments. 

I hope this makes sense  
