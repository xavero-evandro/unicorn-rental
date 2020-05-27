# Unicorn Rental

### Just run this command to install all dependencies
```
npm install
```
### and then run this command to start
```
npm run start:dev
```

## Docker environment -- RECOMMENDED
## Run this to start
```
docker-compose up -d
```

# Endpoints

## GET - localhost:3333/unicorns/rentals
## Request Query Params

#### unicorn - required - string

## Example of a request
```
http://localhost:3333/unicorns/rentals?unicorn=Pinky%20Pie
```
## Should return
```
{
  "message": "Unicorn Pinky Pie rented successfully, enjoy your ride!",
  "unicorn": "Pinky Pie",
  "rentedAt": "05/08/2020, 4:10:47 PM",
  "basePrice": "Price per Hour is €8.00"
}
```

## POST - localhost:3333/unicorns/rentals
## Request Body Params

#### unicorn - required - string

## Example of a request body
```
{
	"unicorn": "Pinky Pie"
}
```

## Should return
```
{
  "message": "Unicorn returned successfully, you have to pay €8.00 Thanks!",
  "value": "8.00",
  "unicorn": "Rainbow Dash",
  "deliveredTime": "05/08/2020, 4:23:40 PM"
}
```


## GET - localhost:3333/healtz
## Example of a request body
```
localhost:3333/healtz
```
## Should return
```
{
  "uptime": 73.856141082,
  "message": "Unicorn Service ok ✨🦄✨",
  "status": 200,
  "timestamp": 1588955040072
}
```

# Test
## Just run this command to execute the unit and e2e test
```
npm run test
```
## I also add a exported file to be imported on Insomnia
