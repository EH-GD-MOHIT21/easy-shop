class InvalidCredentials(Exception):
    def __init__(self, message="Invalid Username or Password Provided."):
        self.message = message
        super().__init__(self.message)



class WaitTimeError(Exception):
    def __init__(self, message="The OTP has already sent please wait for 5 minutes before retry."):
        self.message = message
        super().__init__(self.message)



class UserNotExists(Exception):
    def __init__(self, message="The OTP You are providing for user is either not exists or expired please retry."):
        self.message = message
        super().__init__(self.message)