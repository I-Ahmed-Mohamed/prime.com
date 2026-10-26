import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-architecture-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="architecture" class="prime-section arch-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-diagram-3-fill"></i>
            {{ lang.t('arch.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('arch.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('arch.desc') }}
          </p>
        </div>

        <!-- 4-Layer Architecture Visual Grid -->
        <div class="layers-grid">
          
          <!-- Layer 1: Domain -->
          <div class="layer-card prime-card" [class.active-layer]="selectedLayer() === 'domain'" (click)="selectLayer('domain')">
            <div class="layer-badge domain-badge">Layer 1</div>
            <div class="layer-icon">
              <i class="bi bi-box-fill"></i>
            </div>
            <h3 class="layer-title">{{ lang.t('arch.domain') }}</h3>
            <p class="layer-desc">{{ lang.t('arch.domain_desc') }}</p>
            <div class="layer-tags">
              <span>Entities</span>
              <span>Value Objects</span>
              <span>Domain Events</span>
              <span>Enums</span>
            </div>
          </div>

          <!-- Layer 2: Application -->
          <div class="layer-card prime-card" [class.active-layer]="selectedLayer() === 'application'" (click)="selectLayer('application')">
            <div class="layer-badge app-badge">Layer 2</div>
            <div class="layer-icon">
              <i class="bi bi-shuffle"></i>
            </div>
            <h3 class="layer-title">{{ lang.t('arch.application') }}</h3>
            <p class="layer-desc">{{ lang.t('arch.application_desc') }}</p>
            <div class="layer-tags">
              <span>CQRS</span>
              <span>MediatR</span>
              <span>FluentValidation</span>
              <span>AutoMapper</span>
            </div>
          </div>

          <!-- Layer 3: Infrastructure -->
          <div class="layer-card prime-card" [class.active-layer]="selectedLayer() === 'infra'" (click)="selectLayer('infra')">
            <div class="layer-badge infra-badge">Layer 3</div>
            <div class="layer-icon">
              <i class="bi bi-database-fill-gear"></i>
            </div>
            <h3 class="layer-title">{{ lang.t('arch.infrastructure') }}</h3>
            <p class="layer-desc">{{ lang.t('arch.infrastructure_desc') }}</p>
            <div class="layer-tags">
              <span>EF Core 9</span>
              <span>SQL Server</span>
              <span>Redis Cache</span>
              <span>JWT Auth</span>
            </div>
          </div>

          <!-- Layer 4: Web API & Presentation -->
          <div class="layer-card prime-card" [class.active-layer]="selectedLayer() === 'presentation'" (click)="selectLayer('presentation')">
            <div class="layer-badge api-badge">Layer 4</div>
            <div class="layer-icon">
              <i class="bi bi-cpu-fill"></i>
            </div>
            <h3 class="layer-title">{{ lang.t('arch.api') }}</h3>
            <p class="layer-desc">{{ lang.t('arch.api_desc') }}</p>
            <div class="layer-tags">
              <span>ASP.NET Core API</span>
              <span>SignalR Hubs</span>
              <span>Swagger / OpenAPI</span>
              <span>Angular SPA</span>
            </div>
          </div>

        </div>

        <!-- Architecture Detail Panel / Code Preview -->
        <div class="arch-code-panel prime-card">
          <div class="code-panel-header">
            <div class="code-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="code-filename font-mono">
              <i class="bi bi-file-code-fill"></i>
              {{ getActiveFileName() }}
            </span>
            <div class="code-lang-tag font-mono">C# 13 / .NET 9</div>
          </div>

          <pre class="code-block font-mono"><code>{{ getActiveCodeSnippet() }}</code></pre>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .arch-section {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .layers-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .layer-card {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      padding-top: 2rem;

      &.active-layer {
        border-color: var(--accent-primary);
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.35);
        background: var(--bg-card-hover);
      }

      .layer-badge {
        position: absolute;
        top: 1rem;
        inset-inline-end: 1rem;
        font-size: 0.72rem;
        font-weight: 800;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        text-transform: uppercase;

        &.domain-badge { background: rgba(59, 130, 246, 0.15); color: var(--accent-primary); }
        &.app-badge { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); }
        &.infra-badge { background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); }
        &.api-badge { background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); }
      }

      .layer-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        color: var(--accent-primary);
        margin-bottom: 1.25rem;
      }

      .layer-title {
        font-size: 1.12rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.65rem;
        line-height: 1.3;
      }

      .layer-desc {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.25rem;
        flex: 1;
      }

      .layer-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;

        span {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          background: var(--bg-tertiary);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }
      }
    }

    .arch-code-panel {
      padding: 0;
      overflow: hidden;
      border-color: var(--border-highlight);

      .code-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1.25rem;
        background: rgba(0, 0, 0, 0.25);
        border-bottom: 1px solid var(--border-color);

        .code-dots {
          display: flex;
          gap: 0.45rem;

          .dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;

            &-red { background: #ef4444; }
            &-yellow { background: #f59e0b; }
            &-green { background: #10b981; }
          }
        }

        .code-filename {
          font-size: 0.84rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .code-lang-tag {
          font-size: 0.75rem;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }
      }

      .code-block {
        padding: 1.5rem;
        margin: 0;
        font-size: 0.88rem;
        line-height: 1.7;
        color: var(--text-primary);
        background: rgba(4, 7, 14, 0.6);
        overflow-x: auto;
        direction: ltr;
        text-align: left;
      }
    }
  `]
})
export class ArchitectureSectionComponent {
  readonly lang = inject(LanguageService);
  readonly selectedLayer = signal<'domain' | 'application' | 'infra' | 'presentation'>('application');

  selectLayer(layer: 'domain' | 'application' | 'infra' | 'presentation'): void {
    this.selectedLayer.set(layer);
  }

  getActiveFileName(): string {
    switch (this.selectedLayer()) {
      case 'domain':
        return 'src/Domain/Entities/Order.cs';
      case 'application':
        return 'src/Application/Orders/Commands/CreateOrderCommandHandler.cs';
      case 'infra':
        return 'src/Infrastructure/Persistence/ApplicationDbContext.cs';
      case 'presentation':
        return 'src/WebAPI/Controllers/OrdersController.cs';
    }
  }

  getActiveCodeSnippet(): string {
    switch (this.selectedLayer()) {
      case 'domain':
        return `// Domain Entity with strict encapsulation and Domain Events
public class Order : BaseAuditableEntity
{
    public OrderNumber OrderNumber { get; private set; }
    public ClientId ClientId { get; private set; }
    public Money TotalAmount { get; private set; }
    public OrderStatus Status { get; private set; } = OrderStatus.Draft;

    public void ConfirmPayment(TransactionId transactionId)
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("Order is already processed.");

        Status = OrderStatus.Paid;
        AddDomainEvent(new OrderPaidDomainEvent(this.Id, transactionId));
    }
}`;
      case 'application':
        return `// CQRS Command Handler with MediatR & Pipeline Validation
public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Result<Guid>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUser;
    private readonly IPaymentGatewayService _paymentGateway;

    public async Task<Result<Guid>> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        var order = Order.Create(request.ClientId, request.Items, request.Total);
        
        await _context.Orders.AddAsync(order, ct);
        await _context.SaveChangesAsync(ct);
        
        return Result<Guid>.Success(order.Id);
    }
}`;
      case 'infra':
        return `// Infrastructure Layer: EF Core 9 with Optimized SQL Server Indexes
public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Client> Clients => Set<Client>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        builder.Entity<Order>()
            .HasIndex(o => new { o.ClientId, o.CreatedAt })
            .IncludeProperties(o => o.TotalAmount); // Covering Index
    }
}`;
      case 'presentation':
        return `// Clean RESTful API Controller delegating to MediatR
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly ISender _mediator;

    [HttpPost]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] CreateOrderCommand cmd)
    {
        var result = await _mediator.Send(cmd);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(GetById), new { id = result.Value }, result.Value)
            : BadRequest(result.Error);
    }
}`;
    }
  }
}
