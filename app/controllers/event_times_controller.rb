class EventTimesController < ApplicationController
  before_action :set_event_time, only: [:show, :edit, :update, :destroy]

  # GET /event_times
  # GET /event_times.json
  def index
    @event_times = EventTime.all
  end

  # GET /event_times/1
  # GET /event_times/1.json
  def show
  end

  # GET /event_times/new
  def new
    @event_time = EventTime.new
  end

  # GET /event_times/1/edit
  def edit
  end

  # POST /event_times
  # POST /event_times.json
  def create
    @event_time = EventTime.new(event_time_params)

    respond_to do |format|
      if @event_time.save
        format.html { redirect_to @event_time, notice: 'Event time was successfully created.' }
        format.json { render :show, status: :created, location: @event_time }
      else
        format.html { render :new }
        format.json { render json: @event_time.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /event_times/1
  # PATCH/PUT /event_times/1.json
  def update
    respond_to do |format|
      if @event_time.update(event_time_params)
        format.html { redirect_to @event_time, notice: 'Event time was successfully updated.' }
        format.json { render :show, status: :ok, location: @event_time }
      else
        format.html { render :edit }
        format.json { render json: @event_time.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /event_times/1
  # DELETE /event_times/1.json
  def destroy
    @event_time.destroy
    respond_to do |format|
      format.html { redirect_to event_times_url, notice: 'Event time was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event_time
      @event_time = EventTime.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_time_params
      params.require(:event_time).permit(:event_id, :date, :start_time, :end_time)
    end
end
