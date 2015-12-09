class UpdateEmail < ActionMailer::Base
  default from: "hello@helpmeclarify.com"

  def update_answer(brand, email)
    @brand = brand
    mail(to: email,
         subject: 'Your unique Clarify URL')
  end

end
