class BrandEmail < ActionMailer::Base
  default from: "hello@helpmeclarify.com"

  def brand_answer(brands, brand, email)
    @brands = brands
    @brand = brand
    mail(to: email,
         subject: 'Your Clarify brand as a PDF')
  end

end
