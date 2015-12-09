class BrandsController < ApplicationController

  before_filter :ensure_brands_array
  before_filter :find_brand, only: [:show, :edit, :update, :login, :send_email, :send_update_email]
  before_filter :check_permissions, only: [:show, :edit, :update]
  
  def index
    render json: Brand.all
  end

  def new
    @brand = Brand.new
  end

  def create
    @brand = Brand.new(brand_create_params)
    @brand.retrieval_key = @uuid
    if @brand.save
      render json: @brand, status: 201
      session[:brands] << @brand.id
    else
      render json: {response: @brand.errors.full_messages.to_sentence}, status: 400
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @brand }
      format.pdf do
        pdf = BrandPdf.new(@brand)
        send_data pdf.render, filename: "#{@brand.email}.pdf",
                              type: "application/pdf",
                              disposition: "inline"
      end
    end
  end

  def edit
  end

  def update
    @brand.update_attributes(brand_update_params)
    render json: @brand
  end

  def retrieve_brands
    @retrieved_brands = Brand.where(email: params["email"])
    if (@retrieved_brands.empty?)
      render json: {response: "no email brands with email found"}, status: 400
    else
      send_retrieve_email(@retrieved_brands.first, params["email"])
    end
  end

  def login
    if @brand.retrieval_key == params[:uuid]
      session[:brands] << params[:id].to_i
      redirect_to '/#/' + params[:id]
    end
  end

  def logout
    reset_session
  end

  def send_email
    @brands = Brand.find_all_by_id(session[:brands])
    BrandEmail.brand_answer(@brands, @brand, @brand.email).deliver
    render nothing: true
  end

  def send_retrieve_email(brand, email)
    RetrieveEmail.retrieve_user_email(brand, email).deliver
    redirect_to '/#/'
  end

  def send_update_email
    UpdateEmail.update_answer(@brand, @brand.email).deliver
    render nothing: true
  end


  private

  def check_permissions
    render nothing: true, status: 403 unless session[:brands].include?(params[:id].to_i)
  end

  def ensure_brands_array
    session[:brands] ||= []
  end

  def brand_create_params
    params.require(:brand).permit(:email, :what_you_do, :why_you_do, :how_you_do, :target_audience, :competition_1, :proposition, :purpose, :personality, :market, :competition_2, :retrieval_key, :company)
  end

  def brand_update_params
    params.require(:brand).permit(:what_you_do, :why_you_do, :how_you_do, :target_audience, :competition_1, :proposition, :purpose, :personality, :market, :competition_2, :retrieval_key, :company)
  end

  def find_brand
    @brand = Brand.find(params[:id])
  end


end
