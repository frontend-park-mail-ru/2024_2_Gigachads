# /mail/inbox (GET)
### Get all incoming mails

**produces:**   
application/json   

**responses:**  

**'200':**  
Emails Data   
type: array of emails  

*email:*  
- author (Sender login)   
type: string  
- badge_text (Text in badge)  
type: string  
- text (Text of email)  
type: string  
- description (Text of the email)  
type: string  
- date (Datetime of sending)  
type: string  
- badge_type  
type: string

**'401':**   
Not Authorized  
type: object

*error:*  
- error  
type: string  
- status  
type: integer  

**'404':**    
Error with list    
type: object  

*error:*  
- error  
type: string  
- status  
type: integer  

# /login (POST)  
### User login  

**consumes:**     
application/json  

**produces:**   
application/json   

**parameters:**   
+ User data for login:      
type: object  
  - email (User login)  
type: string  
  - password (User password)  
type: string  

**responses:**  

**'200':**     
Login successful  
type: object  

*response:*  
- status  
type: integer  

**'400':**  
Invalid request body  
type: object  

*error:*    
- error  
type: string  
- status  
type: integer  

**'500':**  
Failed to login  
type: object  

*error:*  
- error  
type: string  
- status   
type: integer  

# /logout: (GET) # 
### User logout  

**produces:**  
application/json  
     
**responses:**  

**'200':**  
Logout successful  
type: object  

*response:*  
- status  
type: integer  

**'500':**  
Failed to logout  
type: object  

*error:*  
- error  
type: string  
- status  
type: integer  
            
# /signup: (POST) #  
### User signup  

**consumes:**   
application/json  

**produces:**  
application/json  

**parameters:**  
+ Info about new user  
  - email (User mail)  
  type: string  
  - name (User name)    
  type: string  
  - password (User password)  
  type: string  
  - repassword (User repeated password)  
  type: string  

**responses:**  

**'200':**  
New user created  
type: object  

*response:*  
- status  
type: integer


**'400':**  
Invalid request body  
type: object  

*error:*  
- error  
type: string  
- status  
type: integer  

**'500':**  
Failed to add user  
type: object  

error:  
- error  
type: string  
- status  
type: integer
