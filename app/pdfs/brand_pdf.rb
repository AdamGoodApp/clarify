class BrandPdf < Prawn::Document

  def initialize(brand)
    super(:margin => [0,0,0,0])
    @brand = brand

    image = "#{Rails.root}/public/assets/clarify_logo_grey.png"
    image_pencil = "#{Rails.root}/public/assets/pencil.png"
    data = [[{:image => image, :fit => [80, 160], :vposition => :middle}, {:image => image_pencil, :fit => [40, 40], :position => :right, :vposition => -5}]]
    table(data, :width => 612, :cell_style => { :border_width => 0, :align => :left, :padding => [30,50,0,50] }, )

    brand_name
    brand_answers
  end

  def brand_name

    font_families.update("Open Sans" => {
      :light => "#{Rails.root}/public/fonts/OpenSans-Light.ttf", # Points to location of font
      :normal => "#{Rails.root}/public/fonts/OpenSans-Regular.ttf", # Points to location of font
      :bold   => "#{Rails.root}/public/fonts/OpenSans-Bold.ttf"
    })
    font "Open Sans"
    data = [["#{@brand.company}"]]
    table(data, :width => 612, :cell_style => { :inline_format => true, :border_width => 0, :align => :left, :padding => [30,50,8,50], :font => "Open Sans", :size => 18 }, )

    data = [["Created #{Time.now.strftime("%m/%d/%Y")}"]]
    table(data, :width => 612, :cell_style => { :inline_format => true, :text_color => "999999", :border_width => 0, :align => :left, :padding => [0,50,10,50], :font => "Open Sans", :size => 10 }, )
  end

  def brand_answers

    font_families.update("Open Sans" => {
      :light => "#{Rails.root}/public/fonts/OpenSans-Light.ttf", # Points to location of font
      :normal => "#{Rails.root}/public/fonts/OpenSans-Regular.ttf", # Points to location of font
      :bold   => "#{Rails.root}/public/fonts/OpenSans-Bold.ttf"
    })
    font "Open Sans"

    move_down 40
    table brand_table_rows do
      row(0).font_style = :bold
      row(4).font_style = :bold
      row(8).font_style = :bold
      row(12).font_style = :bold
      row(16).font_style = :bold
      self.cell_style = { :inline_format => true }
      self.row_colors = ["FFFFFF"]
      self.header = true
      self.cells.border_widths = [0,0,0,0]
      self.cells.padding = [5, 20, 5, 80]
      self.cells.width = 500
      self.cells.size = 10
      self.cells.text_color = "1b1c1a"
    end

    move_down 70

    data = [["<font weight='bold'>Not sure what to do next?</font> <color rgb='FFFFFF'>Visit <link href='http://www.helpmeclarify.com/next-steps'>http://www.helpmeclarify.com/next-steps</link></color>"]]
    table(data, :row_colors => ["2A2A2A"], :width => 612, :cell_style => { :text_color => "999999", :inline_format => true, :size => 10, :border_width => [10,0,0,0], :border_color => "9e9f9e", :align => :center, :padding => [30,20,15,20], :font => "Open Sans" }, )

    data = [["<link href='http://www.helpmeclarify.com/'>www.helpmeclarify.com</link>"]]
    table(data, :row_colors => ["2A2A2A"], :width => 612, :cell_style => { :text_color => "999999", :inline_format => true, :size => 10, :border_width => 0, :align => :center, :padding => [15,20,30,20], :font => "Open Sans" }, )

  end

  def brand_table_rows
    [["<font size='14'>Purpose</font>"]] +
    [["#{@brand.purpose}"]] +
    [[""]] +
    [[""]] +
    [["<font size='14'>Proposition</font>"]] +
    [["#{@brand.proposition}"]] +
    [[""]] +
    [[""]] +
    [["<font size='14'>Personality</font>"]] +
    [["#{@brand.personality}"]] +
    [[""]] +
    [[""]] +
    [["<font size='14'>Market</font>"]] +
    [["#{@brand.market}"]] +
    [[""]] +
    [[""]] +
    [["<font size='14'>Competition</font>"]] +
    [["#{@brand.competition_2}"]]
  end

end