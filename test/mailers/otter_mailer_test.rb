require 'test_helper'

class OtterMailerTest < ActionMailer::TestCase
  test "brand" do
    mail = OtterMailer.brand
    assert_equal "Brand", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
