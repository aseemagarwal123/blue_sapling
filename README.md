Below are the instructions to  hit the APIS

API for assigning a  driver
method-get
query params- 
    type-platinum/gold/silver

API for calculation of fare
method-post
body params- 
    "distance_travelled":non negative number,
    "travel_time":non negative number,
    "rate_per_km":non negative number,
    "waiting_time":non negative number,
    "ride_cancel_after":boolean,
    "ride_cancel_before":boolean,
    "surge":staring- low/medium,high

API for giving rating
method-put
body params- 
    "rating":non negative number between 1 to 5
path params- 
    id- mongo id of the driver that is assigned from the response of assign driver eg-60145552e934ac1b2f3883aa



assumptions-
1) surge is of taken as demand surge which is of three level
a)low=fare *1
b)medium=fare*1.5
c)high=fare*2

2) eligiblity will be decided after first 5 rides
3) actual rating will be shown from the 6th ride


