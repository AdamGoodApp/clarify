class OtterMailer < ActionMailer::Base

  default from: 'rob@builtbyclick.com'

  def brand(brand, email)
    @brand = brand
    mail to: email
  end
end
