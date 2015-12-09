class RetrieveEmail < ActionMailer::Base
  default from: "hello@helpmeclarify.com"

  def retrieve_user_email(brand, email)
    @brand = brand
    if (brand.proposition)
    mail(to: email,
         subject: 'Your Clarify brand as a PDF')
    else
      mail(to: email,
           subject: 'Your unique Clarify URL')
    end

  end

end
